import axios from "axios"
import { DetailedHTMLProps, ImgHTMLAttributes, useCallback, useEffect, useState } from "react"
import queryString from "query-string";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import useDebounce from "../../utils/hooks/useDebounce";
import NoCodeEditor from "../../components/splash-pages/editor/NoCodeEditor";
import useEffectOnce from "../../utils/hooks/useEffectOnce";
import CodeEditor from "../../components/splash-pages/editor/CodeEditor";
import { useAppDispatch, useAppSelector } from "../../context/reduxHooks";
import { getSplashPageByCode } from "../../context/actions/splashActions";
import { appendQuery } from "../../utils/queryparser";
import { useRouter } from "next/router";
import DialogConfirmation from "../../components/dialog/DialogConfirmation";
import Image from "next/image";
import Head from "next/head";



const Editor = ()=>{
  const base_url = process.env.PUBLIC_URL
  const router = useRouter()
  const dispatch = useAppDispatch()
  const splashState = useAppSelector(state=>state.splash)
  const [isCodeEditor,setIsCodeEditor] = useState(false)
  const [value, setValue] = useState("")
  const [confirmSave,setConfirmSave] = useState(false)
  const [confirmDiscard,setConfirmDiscard] = useState(false)
  const debouncedValue = useDebounce<string>(value, 1000)
  const [ htmlCode,setHtmlCode ] = useState<string | undefined>(undefined)

  
  const getHtmlFromApi = async() =>{
    // const response = await axios.get(`http://localhost:1323/transporte3/`)
    const response = await axios.get(splashState.splashPage?.urlSplash as string)
    const codeHtml = response.data
    setHtmlCode(codeHtml)
    setValue(codeHtml)
 
    // updateHtmlCode()
  }

  const onChange = useCallback((value: any, viewUpdate: any) => {
    setValue(value)
  }, []);

  const saveChanges = async() =>{
    const html = document.getElementById("core")?.innerHTML
    const parsed = queryString.parse(window.location.search);  
    const formData = new FormData()
      parsed.edit == "html" ? formData.append('html',value) : formData.append('html',html as string)
      formData.append('filename',splashState.splashPage?.name as string)
      const id = toast.loading("Porfavor espere...")
      try{
          const res =await axios.post(`${base_url}/upload/template/`,formData)
          // const res =await axios.post(`http://localhost:1323/upload2`,formData)
            toast.update(id, {render: res.data, type: "success", isLoading: false,autoClose:5000});
      }catch(err:any){
        toast.update(id, {render:err.message, type: "error", isLoading: false ,autoClose:5000});
      }
  }

  const changeEditMode = (mode:string,bool:boolean)=>{
    setIsCodeEditor(bool)
    router.push(appendQuery(location,{'edit':mode}))
  }
 
   useEffect(()=>{
    if(window.location.search != undefined){
      const parsed = queryString.parse(location.search);  
      dispatch(getSplashPageByCode(parsed.code as string))
    }
   },[])
   useEffect(()=>{
    if(splashState.splashPage != undefined){
      getHtmlFromApi()
    }
   },[splashState.splashPage])
  
useEffect(() => {
  const iframe:any = document.getElementById("myiframe")
 if(iframe != undefined){
   iframe.srcdoc = value
  }
  }, [debouncedValue,isCodeEditor])

  return(
    <>
   <Head key={"head-editor"}>
    <title>Editor</title>
   <meta http-equiv="Cache-control" content="no-cache"/>
    <meta http-equiv="Expires" content="-1"/>
   </Head>
    {confirmSave &&
    <DialogConfirmation
    title="¿Desea guardar los cambios?"
    descripcion="Los cambios realizados serán guardados si decide continuar."
    openModal={confirmSave}
    closeModal={()=>setConfirmSave(false)}
    buttonText2="Guardar cambios"
    descartar={()=>setConfirmSave(false)}
    performAction={()=>{
      saveChanges()
      setConfirmSave(false)
    }}
    />
    }
     {confirmDiscard &&
    <DialogConfirmation
    title="¿Desea descartar los cambios?"
    descripcion="Si decide continuar, los cambios realizados serán descartados."
    openModal={confirmDiscard}
    closeModal={()=>setConfirmDiscard(false)}
    buttonText2="Descartar cambios"
    descartar={()=>setConfirmDiscard(false)}
    performAction={()=>window.location.reload()}
    />
    }

   <ToastContainer/>
    {splashState.splashPage != undefined &&
    <div className={`relative  min-w-[1200px] max-w-[1800px] mx-auto `}>
      <div className="p-4 flex justify-between">
    <div className="cursor-pointer flex items-center space-x-2">
      {/* <div onClick={()=>{}}>
       <Image
            src='/images/teclu-logo.png'
            height={30}
            width={120} alt={''}/>
        </div> */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
        onClick={()=>router.push("/splash-pages")}
        stroke="currentColor" className="w-8 h-8 text-primary">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
     </svg> 
        <div onClick={()=>changeEditMode('preview',false)}
        className={`border-2 p-2 w-20 ${!isCodeEditor && "bg-primary bg-opacity-75 text-white border-primary"}`}>Preview</div>
        <div onClick={()=>changeEditMode('html',true)}
        className={`border-2 p-2 w-20 ${isCodeEditor && "bg-primary bg-opacity-75 text-white border-primary"}`}>HTML</div>
      </div>

      <div className="flex px-2 mt-2 space-x-3">
        <a href={splashState.splashPage.urlSplash} target="_blank" rel="noreferrer" 
        className="button" >Visitar pagina splash</a>
        <button onClick={()=>setConfirmDiscard(true)} className="button" >Descartar Cambios</button>
        <button onClick={()=>setConfirmSave(true)} className="button">Guardar Cambios</button>
      </div>

    </div>
      {isCodeEditor ?
      <div className="grid grid-cols-5">
        <div className={`col-span-3`}>
    <CodeEditor
    value={value}
    onChange={onChange}
    />
    </div>
      <div id="iframe-container" className="w-full bg-white z-10 col-span-2">
        {/* <iframe onChange={(e)=>console.log(e)} className= "w-full h-screen justify-center flex relative"
         src="/transporte2.html"></iframe> */}
         <iframe className= "w-full h-screen flex relative"
         src="https://teclu-portal.s3.sa-east-1.amazonaws.com/ypfb-transporte"
         id="myiframe"></iframe>
      </div>
      </div>

:
   <NoCodeEditor
   htmlCode={htmlCode}
   isCodeEditor={isCodeEditor}
   />
      }
      </div>
  }
    </>
      )
    }
    
    export default Editor;