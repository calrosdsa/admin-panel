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
  const [showDialog,setShowDialog] = useState(false)
  const basicPortal = useAppSelector(state=>state.splash.basicPortal)
  const execute = useAppSelector(state=>state.ui.execute)

 

  const saveChanges = async() =>{
    dispatch(uiActions.setExecute(true))
  }


  // useEffect(()=>{
  //   if(execute){
  //     console.log(file,fileLogo)
  //     if(file == undefined && fileLogo == undefined){
  //       dispatch(saveSplashPage())
  //     }else{
  //       setShowDialog(true)
  //       dispatch(uiActions.setExecute(false))
  //     }
  //   }
  // },[execute])
 
  useEffectOnce(()=>{
    if(window.location.search != undefined){
        const parsed = queryString.parse(location.search);  
        dispatch(getSplashPageByCode(parsed.code as string))
      }
  })

  return(
      <EditLayout saveChanges={saveChanges}>
        <div className=" grid-cols-2">
          {basicPortal != undefined &&
        <NoCodeEditor
        basicPortal={basicPortal}
        />
      }
        </div>
        </EditLayout>
    )
}

export default Edit;