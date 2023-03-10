import axios, { AxiosResponse } from "axios"
import queryString from "query-string";
import { toast } from "react-toastify";
import { AnyAction } from "redux";
// import 'react-toastify/dist/ReactToastify.css';
import { ThunkAction } from "redux-thunk";
import { API_URL } from "../../config";
// import authService from "../../data/service/authService"
import authSlice from "../slices/auth-slice";
import { uiActions } from "../slices/ui-slice";
import { userActions } from "../slices/user-slice";
import { RootState } from "../store";

export const getUserList = () :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{
       try{
        dispatch(uiActions.setInnerLoading(true))
        const response = await axios.get(`/api/user`)
        dispatch(uiActions.setInnerLoading(false))
        dispatch(userActions.setUsersWifi(response.data.users))        
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
        dispatch(uiActions.setInnerLoading(false))
        dispatch(userActions.setSolicitudList(response.data.solicitudes))        
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
  