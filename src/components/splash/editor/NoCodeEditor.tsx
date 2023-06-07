import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import ImageEdit from "./components/ImageEdit";
import { uiActions } from "@/context/slices/ui-slice";
import { splashActions } from "@/context/slices/splash-slice";
import axios, { AxiosResponse } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "@/utils/hooks/useDebounce";
import { BasicPortal, ContentPortal } from "@/data/models/redux-models/splash-data";
import useEffectOnce from "@/utils/hooks/useEffectOnce";
import ContentEdit from "./components/ContentEdit";
import { URL } from "url";
import { Blob } from "buffer";
import { saveSplashPage } from "@/context/actions/splashActions";
import DialogConfirmation from "@/components/dialog/DialogConfirmation";
interface Props {
  basicPortal:BasicPortal
}
const NoCodeEditor = ({basicPortal}:Props)=>{
  const baseUrl = "http://localhost:1323"
  const htmlCode = useAppSelector(state=>state.splash.htmlCode)
  const [showDialog,setShowDialog] = useState(false)
  const execute = useAppSelector(state=>state.ui.execute)
  const [submit,setSubmit] = useState(false)
  const [file,setFile] = useState<File>()
  const [fileLogo,setFileLogo] = useState<File>()
  const dispatch = useAppDispatch()
  const getHtmlFromApi = async() =>{
    try{
        const response = await axios.post(`${baseUrl}/v1/portal/basic/update/`,basicPortal)
        const codeHtml = response.data
        await dispatch(splashActions.setHtmlCode(codeHtml))
    }catch(err:any){
      console.log(err)
    }
  }
const updatedIFrame =async()=>{
  console.log("updating")
  const iframe:any = document.getElementById("myiframe")
  if(iframe != undefined){
      iframe.srcdoc = htmlCode
      // getHtmlFromApi()
  }
}

const uploadImage = async(file:File)=>{
    const formData = new FormData()
    const lastDot = file?.name.lastIndexOf(".") as number
    const imgWebp = file?.name.substring(0,lastDot +1) + "webp"
    formData.append("file",file as File)
    formData.append("filename",imgWebp)
    formData.append("bucketName",basicPortal.bucket_name)
    formData.append("pathName",basicPortal.path_name + "media/")
    const res = await axios.post<string>(`${baseUrl}/v1/upload/converter/`,formData)
    console.log(res.data)
    return res.data
}
const onChangeImage= (e: ChangeEvent<HTMLInputElement>)=>{
  if (e.target.files != null){
    const file = e.target.files[0];
    console.log(file.name)
    setFile(file)
    const objectUrl = window.URL.createObjectURL(file);
    // console.log(objectUrl);
    dispatch(splashActions.setSplashData({
      ...basicPortal,
      image:{
          ...basicPortal.image,
          url:objectUrl
      }
  }))
  return
  }
    dispatch(splashActions.setSplashData({
        ...basicPortal,
        image:{
            ...basicPortal.image,
            [e.target.name]:e.target.value
        }
    }))
}

const onChangeLogo = (e: ChangeEvent<HTMLInputElement>)=>{
  if (e.target.files != null){
    const file = e.target.files[0];
    setFileLogo(file)
    const objectUrl = window.URL.createObjectURL(file);
    // console.log(objectUrl);
    dispatch(splashActions.setSplashData({
      ...basicPortal,
      logo:{
          ...basicPortal.logo,
          url:objectUrl
      }
  }))
  return
  }
  dispatch(splashActions.setSplashData({
      ...basicPortal,
      logo:{
          ...basicPortal.logo,
          [e.target.name]:e.target.value
      }
  }))
}

const onChangeColor = (name:string,value:string)=>{
  console.log(name,value)
  dispatch(splashActions.setSplashData({
    ...basicPortal,
    content:{
        ...basicPortal.content,
        [name]:value
    }
}))
}

const applyChanges = async() =>{
  if(file != undefined){
    dispatch(splashActions.setHtmlCode(undefined))
    await uploadImage(file).then(res=>{
        console.log("uploading")
        dispatch(splashActions.setSplashData({
          ...basicPortal,
          image:{
              ...basicPortal.image,
              url:res
          }
      }))
      setSubmit(true)
      setFile(undefined)
    })
  }else {
    dispatch(splashActions.setHtmlCode(undefined))
    getHtmlFromApi()
  }
}

const applyChangesLogo = async() =>{
  if(fileLogo != undefined){
    dispatch(splashActions.setHtmlCode(undefined))
    await uploadImage(fileLogo).then(res=>{
        console.log("uploading")
        setSubmit(!submit)
        setFileLogo(undefined)
        dispatch(splashActions.setSplashData({
          ...basicPortal,
          logo:{
              ...basicPortal.logo,
              url:res
          }
      }))
    })
  }else {
    dispatch(splashActions.setHtmlCode(undefined))
    getHtmlFromApi()  
  }
}

const applyImage = async()=>{
  if(fileLogo != undefined){
  await uploadImage(fileLogo ).then(res=>{
    // console.log("uploading")
    // setSubmit(!submit)
    setFileLogo(undefined)
    dispatch(splashActions.setSplashData({
      ...basicPortal,
      logo:{
          ...basicPortal.logo,
          url:res
      }
  }))
})
}
if(file != undefined){
  await uploadImage(file).then(res=>{
    console.log("uploading")
    // setSubmit(!submit)
    setFileLogo(undefined)
    dispatch(splashActions.setSplashData({
      ...basicPortal,
      image:{
        ...basicPortal.image,
        url:res
      }
    }))
  })
}
setSubmit(true)
}



useEffect(()=>{
    // console.log('submit')
    getHtmlFromApi()
},[submit])

useEffect(()=>{
  updatedIFrame()
},[htmlCode])

useEffect(()=>{
  if(execute){
    console.log(file,fileLogo)
    if(file == undefined && fileLogo == undefined){
      dispatch(saveSplashPage())
    }else{
      setShowDialog(true)
      dispatch(uiActions.setExecute(false))
    }
  }
},[execute])



  return(
    <>
    {showDialog&&
     <DialogConfirmation
     title="Hay cambios hechos sin guardar. ¿Desea guardarlos?"
     descripcion="Los cambios realizados serán guardados si decide continuar."
     openModal={showDialog}
     closeModal={()=>setShowDialog(false)}
     buttonText2="Guardar cambios"
     descartar={()=>setShowDialog(false)}
     performAction={async()=>{
       dispatch(uiActions.setLoading(true))
       dispatch(uiActions.setOpenDialog(false))
       setShowDialog(false)
      await applyImage()
      dispatch(uiActions.setLoading(false))
      dispatch(uiActions.setOpenDialog(true))
     }}
     />
    }
    <div className="grid gap-y-3 w-full">
        {/* {basicPortal != undefined && */}
        <div className="lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-3 w-full">
          
          <div className="lg:col-span-1 xl:col-span-2 overflow-auto h-[91vh]">
            <div>
            <h2 className="title text-center text-xl underline">Portal Cautivo</h2>
                    <ContentEdit
                    content={basicPortal.content}
                    onChangeColor={onChangeColor}
                    />
                  {/* } */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2  gap-4 mt-3">
                    <ImageEdit
                    image={basicPortal?.image}
                    onChange={onChangeImage}
                    id="image"
                    applyChanges={applyChanges}
                    />
                    <ImageEdit
                    image={basicPortal?.logo}
                    onChange={onChangeLogo}
                    applyChanges={applyChangesLogo}
                    id="logo"
                    />
                    </div>
            </div>


      </div>

      <div id="iframe-container" className="relative h-screen lg:h-full">
        {/* <iframe onChange={(e)=>console.log(e)} className= "w-full h-screen justify-center flex relative"
        src="/transporte2.html"></iframe> */}
        {(htmlCode == undefined) ?
        <div className= " flex fixed animate-pulse bg-gray-400 w-full h-screen lg:h-full "/>
         :
        <iframe className= "w-full h-full  flex relative"
        src={basicPortal.url}
        id="myiframe"></iframe>
        }
      </div>

      </div>
    </div>
    </>
  )
}

export default NoCodeEditor;