import EditLayout from "@/components/layout/EditLayout";
import NoCodeEditor from "@/components/splash/editor/NoCodeEditor";
import { getSplashPageByCode } from "@/context/actions/splashActions";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import { splashActions } from "@/context/slices/splash-slice";
import { uiActions } from "@/context/slices/ui-slice";
import useEffectOnce from "@/utils/hooks/useEffectOnce";
import axios from "axios";
import queryString from "query-string";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";


const Edit = ()=>{
  const base_url = process.env.PUBLIC_URL
  const dispatch = useAppDispatch()
  const splashState = useAppSelector(state=>state.splash)
  const [htmlCode,setHtmlCode] = useState()

  
  const getHtmlFromApi = async() =>{
    try{
        dispatch(uiActions.setLoading(true))
        // const response = await axios.get(`http://localhost:1323/transporte3/`)
        const response = await axios.get(splashState.splashPage?.urlSplash as string,{
          headers:{
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          }
        })
        const codeHtml = response.data
        setHtmlCode(codeHtml)
        dispatch(splashActions.setHtmlCode(codeHtml))
        dispatch(uiActions.setLoading(false))
    }catch(err:any){
        dispatch(uiActions.setLoading(false))
    }
  }

  const saveChanges = async() =>{
    const html = document.getElementById("core")?.innerHTML
    console.log(html)
    const formData = new FormData()
    formData.append('html',html as string)
    formData.append('filename',splashState.splashPage?.name as string)
    const id = toast.loading("Porfavor espere...")
    try{
          const res =await axios.post(`${base_url}/upload/template/`,formData)
          // const res =await axios.post(`http://localhost:1323/upload2`,formData)
            toast.update(id, {render: res.data, type: "success", isLoading: false,autoClose:5000});
            dispatch(uiActions.setOpenDialog(false))
      }catch(err:any){
            dispatch(uiActions.setOpenDialog(false))
        toast.update(id, {render:err.message, type: "error", isLoading: false ,autoClose:5000});
      }
  }
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
      <EditLayout saveChanges={saveChanges}>
        <div className="">
        <NoCodeEditor
        htmlCode={htmlCode}
        isCodeEditor={false}
        />
        </div>
        </EditLayout>
    )
}

export default Edit;