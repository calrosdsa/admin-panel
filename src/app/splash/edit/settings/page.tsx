"use client"
import EditLayout from "@/components/layout/EditLayout"
import SwitchComponent from "@/components/layout/SwitchComponent";
import NoCodeEditor from "@/components/splash/editor/NoCodeEditor";
import EditComponent from "@/components/util/input/EditComponent";
import { getConnectionMethods, getSplashPageByCode, saveSplashPageSettings } from "@/context/actions/splashActions";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import { splashActions } from "@/context/slices/splash-slice";
import { uiActions } from "@/context/slices/ui-slice";
import { ConnectionMethod } from "@/data/models/type/splash-data";
import useEffectOnce from "@/utils/hooks/useEffectOnce";
import axios from "axios";
import queryString from "query-string";
import {useEffect,useState } from 'react'


const AuthMethod = () =>{
  const base_url = process.env.PUBLIC_URL
  const dispatch = useAppDispatch()
  const basicPortal = useAppSelector(state=>state.splash.basicPortal) 
  const connection_methods = useAppSelector(state=>state.splash.connection_methods) 
  const [methods,setMethods] = useState<ConnectionMethod[]>([])

  const saveChanges = async() =>{
    console.log(basicPortal)
      dispatch(saveSplashPageSettings())
    }

  const applyChanges = (addLoader:()=>void,removeLoader:()=>void,value:string,name:string) =>{
       addLoader()
        if(basicPortal == undefined) return
        dispatch(splashActions.setSplashData({
            ...basicPortal,
            settings:{
                ...basicPortal?.settings,
                [name]:value
            }
        }))
        removeLoader()
}

const updateConnectionMethod = (method:ConnectionMethod,isEnabled:boolean) =>{
    if(basicPortal == undefined) return
    const ifContainItem = basicPortal.connection_methods.map(item=>item.method).includes(method.method)
    let newMethods:ConnectionMethod[] = []
    let newMethod:ConnectionMethod  
    if(ifContainItem){
        const newArray = basicPortal.connection_methods.filter(t=>t.method != method.method)
        newMethod = basicPortal.connection_methods.find(item=>item.method == method.method) || method
        newMethod = {...newMethod,enabled:isEnabled}
        newMethods = [...newArray,newMethod]
    }else{
        newMethod = connection_methods.find(item=>item.method == method.method) || method
        newMethod = {...newMethod,enabled:isEnabled}
        newMethods = [...basicPortal.connection_methods,newMethod]
    }
    dispatch(splashActions.setSplashData({
        ...basicPortal,
        connection_methods:newMethods
    }))
}

useEffect(()=>{
    console.log("------------------------xxxx-------------",basicPortal?.connection_methods)
    if(basicPortal != undefined && connection_methods.length == 0){
        setMethods(basicPortal.connection_methods)
        dispatch(getConnectionMethods(basicPortal?.settings.portal_type))
    }
},[basicPortal])

useEffectOnce(()=>{
    if(window.location.search != undefined){
        const parsed = queryString.parse(location.search);  
        console.log(basicPortal,"--------------------")
        if(basicPortal == undefined){
            dispatch(getSplashPageByCode(parsed.code as string))
        }
      }
  })
    

  return(
      <>
      {basicPortal != undefined&&  
        <EditLayout
        saveChanges={saveChanges}>
            <div className="relative">
                <div className="grid xl:grid-cols-2 sm:px-10 pt-5 gap-4 2xl:gap-6">

                <div className="px-2">
                <span className="title underline">Ajustes</span>
                 <EditComponent
                 label="Url de Redirección"
                 content={basicPortal?.settings.url_redirect || ""}
                 edit={(addLoader,removeLoader,value)=>applyChanges(addLoader,removeLoader,value,"url_redirect")}
                 />   
                 <EditComponent
                 label="Url para las policas de privacidad"
                 content={basicPortal?.settings.policy_url || ""}
                 edit={(addLoader,removeLoader,value)=>applyChanges(addLoader,removeLoader,value,"policy_url")}
                 />   
                 </div>

                 <div className="px-2">
                    <span className="title underline">Metodos de connexion disponitbles</span>

                    {connection_methods.map((item,idx)=>{
                    // const newItem = basicPortal.connection_methods.find(v=>v.method ==item.method) 
                    const newItem = basicPortal.connection_methods.find(v=>item.method == v.method) || item
                        return(
                            <div key={idx} className="py-4 border-b-2">
                        <SwitchComponent
                        isChecked={newItem?.enabled || false}
                        onChange={(e)=>{
                            updateConnectionMethod(item,e)
                            // setFacebookLogin(e)
                            // enabledButton("buttonLoginFacebook",facebookLogin,`getAccessWithFacebook()`,"Facebook","https://teclu-portal.s3.sa-east-1.amazonaws.com/media/facebook-square.png")
                        }}
                        title={item.label}
                        />
                            </div>
                        )
                    })}
                    

                 </div>

              
            
                </div>
            
            </div>
        </EditLayout>
        }
                </>
    )
}

export default AuthMethod;