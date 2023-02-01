import axios, { AxiosResponse } from "axios"
import { getCookie } from "cookies-next";

import { AnyAction } from "redux";
// import 'react-toastify/dist/ReactToastify.css';
import { ThunkAction } from "redux-thunk";
import { redirectToLogin } from ".";
import { API_URL } from "../../config";
// import authService from "../../data/service/authService"
import authSlice from "../slices/auth-slice";
import { splashActions } from "../slices/splash-slice";
import uiSlice, { uiActions } from "../slices/ui-slice";
import { RootState } from "../store";
// import { uiActions } from "../slices/ui-slice";
// import { NextRouter } from "next/router";

export const authActions = authSlice.actions


export const getSplashPageList = () :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{

        try{
            dispatch(uiActions.setLoading(true))
            const response = await axios.get('/api/splash-pages')
            console.log(response.data)
            // const response =await axios.get('/api/splash-pages')
            dispatch(uiActions.setLoading(false))
            // localStorage.setItem('token',response.data.access_token)
            dispatch(splashActions.setSplashPages(response.data.portales))
        }catch(err:any){
            dispatch(uiActions.setLoading(false))
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
            console.log(code)
            dispatch(uiActions.setLoading(true))
            const access_token = getCookie("access_token")
            const response = await axios.post(`/api/splash-pages`,{code})
            // const response =await axios.get('/api/splash-pages')
            dispatch(uiActions.setLoading(false))
            console.log(response.data.portal)
            // localStorage.setItem('token',response.data.access_token)
            dispatch(splashActions.setSplashPage(response.data.portal))
        }catch(err:any){
            dispatch(uiActions.setLoading(false))
            if(err.response.status == 401){
                redirectToLogin()
            }
            console.log(err)
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
  
