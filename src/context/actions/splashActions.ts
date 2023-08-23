import axios, { AxiosResponse } from "axios"
import { getCookie } from "cookies-next";

import { AnyAction } from "redux";
// import 'react-toastify/dist/ReactToastify.css';
import { ThunkAction } from "redux-thunk";
import { redirectToLogin } from ".";
import { API_URL, PUBLIC_URL } from "../../config";
// import authService from "../../data/service/authService"
import authSlice from "../slices/auth-slice";
import { splashActions } from "../slices/splash-slice";
import uiSlice, { uiActions } from "../slices/ui-slice";
import { RootState } from "../store";
import { toast } from "react-toastify";
import { BasicPortal } from "@/data/models/redux-models/splash-data";
// import { uiActions } from "../slices/ui-slice";
// import { NextRouter } from "next/router";

export const authActions = authSlice.actions


export const getSplashPageList = () :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{

        try{
            dispatch(uiActions.setInnerLoading(true))
            const response = await axios.get('/api/splash-pages')
            // const splashUrl = response.data.portales[0].urlSplash 
            // const s = splashUrl.lastIndexOf("/")
            // const splashBaseUrl = splashUrl.substring(0,s +1)
            // dispatch(splashActions.setSplashBaseUrl(splashBaseUrl))
            dispatch(uiActions.setInnerLoading(false))
            // localStorage.setItem('token',response.data.access_token)
            dispatch(splashActions.setSplashPages(response.data.portales))
        }catch(err:any){
            dispatch(uiActions.setInnerLoading(false))
            if(err.response.status == 401){
                redirectToLogin()
            }
            console.log(err)
        }
    }
}

export const getSplashPageByCode = (code:string) :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{
        try{
            dispatch(uiActions.setLoading(true))
            const response = await axios.get(`/api/splash-pages/portal?code=${code}`)
            console.log(response.data.portal)
            dispatch(uiActions.setLoading(false))
            dispatch(splashActions.setSplashData(response.data.portal))
        }catch(err:any){
            dispatch(uiActions.setLoading(false))
            if(err.response.status == 401){
                redirectToLogin()
            }
            console.log(err)
        }
    }
}



export const saveSplashPage = () :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch,getState)=>{
        try{
            const portal = getState().splash.basicPortal
            dispatch(uiActions.setOpenDialog(false))
            dispatch(uiActions.setLoading(true))
            const res = await axios.post(`/api/splash-pages/portal/save`,portal)
            dispatch(uiActions.setLoading(false))
            dispatch(uiActions.setExecute(false))
            toast.success(res.data)
          }catch(err:any){
            dispatch(uiActions.setLoading(false))
            toast.error(err.response.data.message)
          }
    }
}

export const updatePortal = (portal:BasicPortal) :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{
        try{
            const res = await axios.post(`/api/splash-pages/portal/update`,portal)
            const codeHtml = res.data.portal
            dispatch(splashActions.setHtmlCode(codeHtml))
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
            const res = await axios.post(`/api/splash-pages/portal/update-settings`,portal)
            dispatch(uiActions.setLoading(false))
            dispatch(uiActions.setExecute(false))
            toast.success(res.data)
          }catch(err:any){
            dispatch(uiActions.setLoading(false))
            toast.error(err.response.data.message)
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
  
