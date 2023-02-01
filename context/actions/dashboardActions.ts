import axios, { AxiosResponse } from "axios"
import { getCookie } from "cookies-next";

import { AnyAction } from "redux";
// import 'react-toastify/dist/ReactToastify.css';
import { ThunkAction } from "redux-thunk";
import { redirectToLogin } from ".";
import { API_URL } from "../../config";
// import authService from "../../data/service/authService"
import authSlice from "../slices/auth-slice";
import { dashboardAction } from "../slices/dashboard-slice";
import { splashActions } from "../slices/splash-slice";
import uiSlice, { uiActions } from "../slices/ui-slice";
import { RootState } from "../store";
// import { uiActions } from "../slices/ui-slice";
// import { NextRouter } from "next/router";

export const authActions = authSlice.actions


export const getDataLikeForWeek = () :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{

        try{
            dispatch(uiActions.setLoading(true))
            // const access_token = getCookie("access_token")
            const response = await axios.get('/api/dashboard/likes')
            // const response =await axios.get('/api/splash-pages')
            dispatch(uiActions.setLoading(false))
            console.log(response.data.res)
            // localStorage.setItem('token',response.data.access_token)
            dispatch(dashboardAction.setLikeDataForWeek(response.data.res))
        }catch(err:any){
            dispatch(uiActions.setLoading(false))
            if(err.response.status == 401){
                redirectToLogin()
            }
            console.log(err)
        }
    }
}

export const donwloadReportLastTenDays = () :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{
        try{
            dispatch(uiActions.setLoading(true))
            const response = await axios.get('/api/auth/token')
            await axios.get(`${API_URL}/apiFB/public/facebook/report`,{
                headers:{
                    'Authorization':`Bearer ${response.data.access_token}`
                },
                responseType:'blob',
                onDownloadProgress: function(progressEvent){
                    console.log(progressEvent)
                    // let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total); // you can use this to show user percentage of file downloaded
                }
            }).then((response)=>{
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `reporte.pdf`); //or any other extension
                document.body.appendChild(link);
                link.click();
            })
            
            dispatch(uiActions.setLoading(false))
            // localStorage.setItem('token',response.data.access_token)
        }catch(err:any){
            dispatch(uiActions.setLoading(false))
            if(err.response.status == 401){
                redirectToLogin()
            }
            console.log(err)
        }
    }
}

export const donwloadReportById = (id:string) :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{
        try{
            dispatch(uiActions.setLoading(true))
            const response = await axios.get('/api/auth/token')
            await axios.get(`${API_URL}/apiFB/public/facebook/report/${id}`,{
                headers:{
                    'Authorization':`Bearer ${response.data.access_token}`
                },
                responseType:'blob',
                onDownloadProgress: function(progressEvent){
                    console.log(progressEvent)
                    // let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total); // you can use this to show user percentage of file downloaded
                }
            }).then((response)=>{
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `reporte-${id}.pdf`); //or any other extension
                document.body.appendChild(link);
                link.click();
            })
            
            dispatch(uiActions.setLoading(false))
            // localStorage.setItem('token',response.data.access_token)
        }catch(err:any){
            dispatch(uiActions.setLoading(false))
            if(err.response.status == 401){
                redirectToLogin()
            }
            console.log(err)
        }
    }
}



  
