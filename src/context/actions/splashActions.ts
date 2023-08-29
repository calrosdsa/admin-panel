"use client"
import axios, { AxiosResponse } from "axios"
import { getCookie } from "cookies-next";

import { AnyAction } from "redux";
// import 'react-toastify/dist/ReactToastify.css';
import { ThunkAction } from "redux-thunk";
import { getBadRequestError, redirectToLogin } from ".";
import { API_URL, PUBLIC_URL } from "../../config";
// import authService from "../../data/service/authService"
import authSlice from "../slices/auth-slice";
import { splashActions } from "../slices/splash-slice";
import uiSlice, { uiActions } from "../slices/ui-slice";
import { RootState } from "../store";
import { toast } from "react-toastify";
import { BasicPortal, PortalType } from "@/data/models/type/splash-data";
// import { uiActions } from "../slices/ui-slice";
// import { NextRouter } from "next/router";

export const authActions = authSlice.actions


export const getSplashPageList = () :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{

        try{
            dispatch(uiActions.setInnerLoading(true))
            const response = await axios.get('/api/splash-pages')
            console.log(response)
            // const splashUrl = response.data.portales[0].urlSplash 
            // const s = splashUrl.lastIndexOf("/")
            // const splashBaseUrl = splashUrl.substring(0,s +1)
            // dispatch(splashActions.setSplashBaseUrl(splashBaseUrl))
            dispatch(uiActions.setInnerLoading(false))
            // localStorage.setItem('token',response.data.access_token)
            dispatch(splashActions.setSplashPages(response.data.Likes))
        }catch(err:any){
            dispatch(uiActions.setInnerLoading(false))
            if(err.response.status == 401){
                redirectToLogin()
            }
            console.log(err)
        }
    }
}

export const getConnectionMethods = (portalType:PortalType | undefined) :ThunkAction<void,RootState,undefined,AnyAction>=>{
return async(dispatch)=>{
        try{
            if (portalType == undefined) return 
            console.log("portaltype",portalType)
            dispatch(uiActions.setInnerLoading(true))
            const response = await fetch(`/api/splash-pages/portal/connection-methods?portalType=${portalType}`)
            let data;
            switch(response.status){
                case 200:
                    data =await response.json()
                    dispatch(uiActions.setInnerLoading(false))
                    dispatch(splashActions.setConnectionMethods(data))
                case 400:
                    data = await response.json()
                    dispatch(uiActions.setInnerLoading(false))
                    getBadRequestError(data)
                case 401:
                    redirectToLogin()    
                default:
                    dispatch(uiActions.setInnerLoading(false))
            }

        }catch(err:any){
            dispatch(uiActions.setInnerLoading(false))
            
            console.log(err)
        }
    }
}

export const getSplashPageByCode = (code:string) :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{
        try{
            dispatch(uiActions.setLoading(true))
            const response = await fetch(`/api/splash-pages/portal?code=${code}`)
            let data;
            switch(response.status){
                case 200:
                    data =await response.json()
                    dispatch(uiActions.setLoading(false))
                    dispatch(splashActions.setSplashData(data))
                case 400:
                    data = await response.json()
                    dispatch(uiActions.setLoading(false))
                    getBadRequestError(data)
                case 401:
                    redirectToLogin()
                default:
                    dispatch(uiActions.setLoading(false))
            }
        }catch(err:any){
            dispatch(uiActions.setLoading(false))
            // if(err.response.status == 401){
            //     redirectToLogin()
            // }
            console.log(err,"error")
        }
    }
}



export const saveSplashPage = () :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch,getState)=>{
        try{
            const portal = getState().splash.basicPortal
            dispatch(uiActions.setOpenDialog(false))
            dispatch(uiActions.setLoading(true))
            const response = await fetch(`/api/splash-pages/portal/save`,{
                method:'post',
                body:JSON.stringify(portal)
            })
            let data;
            switch(response.status){
                case 200:
                    data =await response.json()
                    dispatch(uiActions.setLoading(false))
                    dispatch(uiActions.setExecute(false))
                    toast.success(data)
                case 400:
                    data = await response.json()
                    // console.log(data.message,"error 400")
                    dispatch(uiActions.setLoading(false))
                    getBadRequestError(data)
                default:
                    dispatch(uiActions.setLoading(false))
            }
          }catch(err:any){
            dispatch(uiActions.setLoading(false))
          }
    }
}

export const updatePortal = (portal:BasicPortal) :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{
        try{
            const response = await fetch(`/api/splash-pages/portal/update`,{
                method:"post",
                body:JSON.stringify(portal)
            })
            let data;
            switch(response.status){
                case 200:
                    data =await response.json()
                    dispatch(splashActions.setHtmlCode(data))
                case 400:
                    data = await response.json()
                    getBadRequestError(data)
                default:
                    console.log(response.status)
            }
          }catch(err:any){
            // console.log("ERROR----------",err)
            // toast.error(err.response.data.message)
          }
    }
}

export const saveSplashPageSettings = () :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch,getState)=>{
        try{
            const portal = getState().splash.basicPortal
            dispatch(uiActions.setOpenDialog(false))
            dispatch(uiActions.setLoading(true))
            const response = await fetch(`/api/splash-pages/portal/update-settings`,{
                method:'post',
                body:JSON.stringify(portal)
            })
            let data;
            switch(response.status){
                case 200:
                    data =await response.json()
                    dispatch(uiActions.setLoading(false))
                    dispatch(uiActions.setExecute(false))
                    toast.success(data)
                case 400:
                    data = await response.json()
                    dispatch(uiActions.setLoading(false))
                    getBadRequestError(data)
                default:
                    dispatch(uiActions.setLoading(false))
            }
          }catch(err:any){
            dispatch(uiActions.setLoading(false))
            // toast.error(err.response.data.message)
          }
    }
}

// export const validateLike = async()=>{
//     const validateLike = await axios.get(`https://teclu.com/validatelike.php?name=${username}`)
//     const hasLike:boolean = validateLike.data
// }

// export const getDataUser = async(accessToken:string):Promise<AxiosResponse<any, any>>=>{
//     const userRes =await axios.get(`https://graph.facebook.com/v15.0/me?fields=id%2Cname&access_token=${accessToken}`)
//     // const username = userRes.data.name
//     // const validateLike = await axios.get(`https://teclu.com/validatelike.php?name=${username}`)
//     // const hasLike:boolean = validateLike.data
//     return userRes
// }
  
