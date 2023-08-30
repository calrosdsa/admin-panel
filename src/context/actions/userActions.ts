import axios, { AxiosResponse, CancelTokenSource } from "axios"
import queryString from "query-string";
import { Id, toast } from "react-toastify";
import { AnyAction } from "redux";
// import 'react-toastify/dist/ReactToastify.css';
import { ThunkAction } from "redux-thunk";
import { API_URL } from "../../config";
// import authService from "../../data/service/authService"
import authSlice from "../slices/auth-slice";
import { uiActions } from "../slices/ui-slice";
import { userActions } from "../slices/user-slice";
import { RootState } from "../store";
import moment from "moment";
import { dashboardAction } from "../slices/dashboard-slice";
import { ReporteId } from "@/data/models/type/dashboard-model";
import { redirectToLogin } from ".";

export const getUserList = () :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{
       try{
        dispatch(userActions.setUsersWifi([]))        
        dispatch(uiActions.setInnerLoading(true))
        const response = await axios.get(`/api/user`)
        dispatch(uiActions.setInnerLoading(false))
        dispatch(userActions.setUsersWifi(response.data))        
       }catch(err:any){
        dispatch(uiActions.setInnerLoading(false))
        console.log(err)
        toast.error(err.response.message)
       }
}
}

export const getEncuestas = () :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{
       try{
        dispatch(uiActions.setInnerLoading(true))
        const response = await axios.get(`/api/user/encuesta`)
        const count =Math.ceil(response.data.length / 30)
        // console.log(response.data)
        dispatch(uiActions.setTotalCount(count))
        dispatch(uiActions.setInnerLoading(false))
        dispatch(userActions.setEncuestas(response.data))        
       }catch(err:any){
        dispatch(uiActions.setInnerLoading(false))
        console.log(err)
        toast.error(err.response.message)
       }
}
}

export const getUserBussinessList =() :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{
       try{
        dispatch(uiActions.setLoading(true))
        const response = await axios.get(`/api/user/bussiness/list`)
        dispatch(uiActions.setLoading(false))
        dispatch(userActions.setUserBussiness(response.data))        
       }catch(err:any){
        dispatch(uiActions.setLoading(false))
        console.log(err)
        toast.error(err.response.message)
       }
}
}

export const getUserWifi =(id:string) :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{
       try{
        dispatch(uiActions.setLoading(true))
        const response = await axios.get(`/api/user/user-detail?id=${id}`)
        dispatch(uiActions.setLoading(false))
        dispatch(userActions.setUserWifi(response.data))        
       }catch(err:any){
        dispatch(uiActions.setLoading(false))
        console.log(err)
        toast.error(err.response.message)
       }
}
}

export const getDispositivos =(id:string) :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{
       try{
        dispatch(uiActions.setInnerLoading(true))
        const response = await axios.get(`/api/user/user-detail/dispositivos?id=${id}`)
        console.log(response.data)
        dispatch(uiActions.setInnerLoading(false))
        if(typeof response.data != 'string'){
            dispatch(userActions.setDispositivos(response.data))        
        }
       }catch(err:any){
        dispatch(uiActions.setInnerLoading(false))
        console.log(err)
        toast.error(err.response.message)
       }
}
}

export const getConexiones =(id:string) :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{
       try{
        dispatch(uiActions.setInnerLoading(true))
        const response = await axios.get(`/api/user/user-detail/conexiones?id=${id}`)
        dispatch(uiActions.setInnerLoading(false))
        dispatch(userActions.setConexiones(response.data))        
       }catch(err:any){
        dispatch(uiActions.setInnerLoading(false))
        console.log(err)
        toast.error(err.response.message)
       }
}
}

export const getSolicitudList =(param:string="Todos") :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{
       try{
        dispatch(uiActions.setInnerLoading(true))
        const response = await axios.get(`/api/user/solicitud?param=${param}`)
        console.log(response.data)
        dispatch(uiActions.setInnerLoading(false))
        dispatch(userActions.setSolicitudList(response.data))        
       }catch(err:any){
        dispatch(uiActions.setInnerLoading(false))
        console.log(err)
        toast.error(err.response.message)
       }
}
}

export const changeSolicitudState = (status:string) :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch,getState)=>{
        try{
            dispatch(uiActions.setInnerLoading(true))
            const id = getState().user.ids
            const formData = new FormData()
            formData.append("id",JSON.stringify(id))
            formData.append("status",status)
            const resAuth = await axios.get('/api/auth/token')
            const res = await axios.post(`${API_URL}/apiFB/public//solicitud/update`,formData,{
                headers:{
                    'Authorization':`Bearer ${resAuth.data.access_token}`
                }
            })
            console.log(res)
            dispatch(userActions.clearListIdsSolicitudes())
            dispatch(getSolicitudList()) 
            // console.log(res.data)
        }catch(err:any){
             dispatch(uiActions.setInnerLoading(false))
             toast.error(err.response.message)
            console.log(err)
        }
    }
}


export const donwloadUserReportPdf = (
    idProgress:number,id: Id,source:CancelTokenSource) :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{
        // const date = new Date().toLocaleString().replaceAll(":",";").replaceAll("/","-")
        moment.locale("es")
        const date = moment().format('LLLL').replace(":",";");
        try{
            const formData = new FormData()
            formData.append("idpost","0")
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
                link.setAttribute('download', `${date} - Reporte (general).pdf`); //or any other extension
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


export const donwloadUserReportExcel = (
    idProgress:number,
    id: Id,source:CancelTokenSource) :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{
        moment.locale("es")
        const date = moment().format('LLLL').replace(":",";");
        try{
            const formData = new FormData()
            formData.append("idpost","0")
            dispatch(dashboardAction.setOngoingProcess(idProgress))
            const response = await axios.get('/api/auth/token')
            await axios.post(`${API_URL}/apiFB/public/facebook/reportexcel`,formData,{
                headers:{
                    'Authorization':`Bearer ${response.data.access_token}`
                },
                cancelToken:source.token,
                responseType:'blob'
            }).then((response)=>{
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${date} - Reporte (general).xlsx`); //or any other extension
                document.body.appendChild(link);
                toast.update(id, {render: "Se ha completado la descarga", type: "success", isLoading: false,autoClose:5000});
                link.click();
            })
            dispatch(dashboardAction.removeOngoingProcess(idProgress))
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