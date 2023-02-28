import EditLayout from "@/components/layout/EditLayout";
import CodeEditor from "@/components/splash/editor/CodeEditor";
import { getSplashPageByCode } from "@/context/actions/splashActions";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import { splashActions } from "@/context/slices/splash-slice";
import { uiActions } from "@/context/slices/ui-slice";
import useDebounce from "@/utils/hooks/useDebounce";
import useEffectOnce from "@/utils/hooks/useEffectOnce";
import axios from "axios";
import queryString from "query-string";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";


const HtmlCode = ()=>{
    const base_url = process.env.PUBLIC_URL
    const dispatch = useAppDispatch()
    const splashState = useAppSelector(state=>state.splash)
    const debouncedValue = useDebounce<string | undefined>(splashState.htmlCode, 1000)
    const onChange = useCallback((value: any, viewUpdate: any) => {
        dispatch(splashActions.setHtmlCode(value))
      }, []);

      const getHtmlFromApi = async() =>{
        try{
            dispatch(uiActions.setLoading(true))
            // const response = await axios.get(`http://localhost:1323/transporte3/`)
            const response = await axios.get(splashState.splashPage?.urlSplash as string)
            const codeHtml = response.data
            dispatch(splashActions.setHtmlCode(codeHtml))
            dispatch(uiActions.setLoading(false))
        }catch(err:any){
            dispatch(uiActions.setLoading(false))
        }
     
        // updateHtmlCode()
      }

      const saveChanges = async() =>{
        const html = splashState.htmlCode
        const formData = new FormData()
        formData.append('html',html as string)
        formData.append('filename',splashState.splashPage?.name as string)
        const id = toast.loading("Porfavor espere...")
        try{
              const res =await axios.post(`${base_url}/upload/template/`,formData)
              dispatch(uiActions.setOpenDialog(false))
              // const res =await axios.post(`http://localhost:1323/upload2`,formData)
                toast.update(id, {render: res.data, type: "success", isLoading: false,autoClose:5000});
          }catch(err:any){
            toast.update(id, {render:err.message, type: "error", isLoading: false ,autoClose:5000});
          }
      }
    

    useEffect(() => {
    const iframe:any = document.getElementById("myiframe")
    if(iframe != undefined){
        iframe.srcdoc = splashState.htmlCode
    }
    }, [debouncedValue])

    useEffect(()=>{
        getHtmlFromApi()
    },[splashState.splashPage])

    useEffectOnce(()=>{
        
        if(window.location.search != undefined){
            const parsed = queryString.parse(location.search);  
            dispatch(getSplashPageByCode(parsed.code as string))
          }
      })
    return(
       <EditLayout 
       saveChanges={saveChanges}>
         <div className={`grid grid-cols-5 ${splashState.htmlCode == undefined? " transition-all opacity-0 duration-1000":
        " transition-all opacity-100 duration-1000"}`}>
        <div className={`col-span-3`}>
            <CodeEditor
            value={splashState.htmlCode}
            onChange={onChange}
            />
    </div>
      <div id="iframe-container" className="w-full bg-white z-10 col-span-2">
        {/* <iframe onChange={(e)=>console.log(e)} className= "w-full h-screen justify-center flex relative"
         src="/transporte2.html"></iframe> */}
         {splashState.htmlCode != undefined &&
         <iframe className= "w-full h-screen flex relative"
         src="https://teclu-portal.s3.sa-east-1.amazonaws.com/ypfb-transporte"
         id="myiframe"></iframe>
        }
      </div>
      </div>
       </EditLayout>
    )
}

export default HtmlCode;