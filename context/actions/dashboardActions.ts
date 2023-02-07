import axios, { AxiosResponse, CancelTokenSource } from "axios"
import { getCookie } from "cookies-next";
import moment from "moment";
import { Id, toast } from "react-toastify";

import { AnyAction } from "redux";
// import 'react-toastify/dist/ReactToastify.css';
import { ThunkAction } from "redux-thunk";
import { redirectToLogin } from ".";
import { API_URL } from "../../config";
import { ReporteId } from "../../data/models/redux-models/dashboard-model";
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

export const getDataLikeForWeekUserWifi = () :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{

        try{
            dispatch(uiActions.setLoading(true))
            // const access_token = getCookie("access_token")
            const response = await axios.get('/api/dashboard/likesLocal')
            // const response =await axios.get('/api/splash-pages')
            dispatch(uiActions.setLoading(false))
            // localStorage.setItem('token',response.data.access_token)
            dispatch(dashboardAction.setLikeDataForLikesUserWifi(response.data.res))
        }catch(err:any){
            dispatch(uiActions.setLoading(false))
            if(err.response.status == 401){
                redirectToLogin()
            }
            console.log(err)
        }
    }
}

export const donwloadReportLastTenDays = (userwifi:string,
    idProgress:number,
    id: Id,source:CancelTokenSource) :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{
        // const date = new Date().toLocaleString().replaceAll(":",";").replaceAll("/","-")
        const date = moment().format('LLLL');
        // console.log(date1)
      
        try{
            const formData = new FormData()
            formData.append("idpost","0")
            formData.append("userwifi",userwifi)
            dispatch(dashboardAction.setOngoingProcess(idProgress))
            const response = await axios.get('/api/auth/token')
            await axios.post(`${API_URL}/apiFB/public/facebook/report`,formData,{
                headers:{
                    'Authorization':`Bearer ${response.data.access_token}`
                },
                cancelToken:source.token,
                responseType:'blob'
            }).then((response)=>{
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${date}.pdf`); //or any other extension
                document.body.appendChild(link);
                toast.update(id, {render: "Se ha completado la descarga", type: "success", isLoading: false,autoClose:5000});
                link.click();
            })
            dispatch(dashboardAction.removeOngoingProcess(idProgress))
            // dispatch(uiActions.setLoading(false))
            // localStorage.setItem('token',response.data.access_token)
        }catch(err:any){
            console.log(err)
            if (axios.isCancel(err)) {
                toast.update(id, {render:"Descarga Cancelada", type: "info", isLoading: false ,autoClose:5000});
                dispatch(dashboardAction.removeOngoingProcess(idProgress))
            }else{
                dispatch(dashboardAction.removeOngoingProcess(idProgress))
                toast.update(id, {render:err.response.message, type: "error", isLoading: false ,autoClose:5000});
                // dispatch(uiActions.setLoading(false))
                if(err.response.status == 401){
                    redirectToLogin()
                }
            }
        }
    }
}



export const donwloadReportById = (idPost:string,userwifi:string,idProgress:number) :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{
        const id = toast.loading("Porfavor espere...")
        // const date = new Date().toLocaleString().replaceAll(":","-").replaceAll("/",";")
        const date = moment().format('LLLL');

        try{
            const formData = new FormData()
            formData.append("idpost",idPost)
            formData.append("userwifi",userwifi)
            dispatch(dashboardAction.setOngoingProcess(idProgress))
            const response = await axios.get('/api/auth/token')
            await axios.post(`${API_URL}/apiFB/public/facebook/report`,formData,{
                headers:{
                    'Authorization':`Bearer ${response.data.access_token}`
                },
                responseType:'blob',
            }).then((response)=>{
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${date}.pdf`); //or any other extension
                document.body.appendChild(link);
                link.click();
                toast.update(id, {render: "Se ha completado la descarga", type: "success", isLoading: false,autoClose:5000});
            })
            dispatch(dashboardAction.removeOngoingProcess(idProgress))
            // localStorage.setItem('token',response.data.access_token)
        }catch(err:any){
            // toast.update(id, {render: err.response.message, type: "error", isLoading: false,autoClose:5000});
            dispatch(dashboardAction.removeOngoingProcess(idProgress))
            if(err.response.status == 401){
                redirectToLogin()
            }
            console.log(err)
        }
    }
}



  



  
