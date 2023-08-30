import axios, { AxiosResponse } from "axios"
import queryString from "query-string";
import { AnyAction } from "redux";
// im   -toastify/dist/ReactToastify.css';
import { ThunkAction } from "redux-thunk";
// import authService from "../../data/service/authService"
import authSlice from "../slices/auth-slice";
import { RootState } from "../store";
// import { uiActions } from "../slices/ui-slice";
// import { NextRouter } from "next/router";
import { uiActions } from "../slices/ui-slice";
import { getCookie, setCookie } from "cookies-next";
import { redirectToLogin } from ".";
import { toast } from "react-toastify";
import { User } from "@/data/models/type/auth-model";

export const authActions = authSlice.actions


export const getUserData = () :ThunkAction<void,RootState,undefined,AnyAction> =>{
    return async(dispatch)=>{
        try{
            const rol =localStorage.getItem("_rol")
            const user =JSON.parse(localStorage.getItem("user") as string)
            // console.log(rol)
            dispatch(authActions.setRol(rol as string))
            dispatch(authActions.setUser(user as User))
            // const response = await axios.get("/api/auth/token")
            // console.log(response.data)
        }catch(err:any){
            if(err.response.status == 401){
                redirectToLogin()
            }
            console.log('ERROR',err.response.data.success)
        }
    }
}

export const resetPassword = (
    currentPassword:string,
    newPassword:string,
    close:()=>void
) :ThunkAction<void,RootState,undefined,AnyAction> =>{
    return async(dispatch)=>{
        try{
            dispatch(uiActions.setLoading(true))
            const formData = new FormData()
            formData.append("password",currentPassword)
            formData.append("passwordNew",newPassword)
            const resToken = await axios.get('/api/auth/token')
            // console.log(resToken)
            await axios.post("https://teclu.com/apiFB/public/userbusiness/updatePassword",formData,{
                headers:{
                    'Authorization':`Bearer ${resToken.data.access_token}`
                }
            })
            toast.success("Actualizado correctamente")
            close()
            dispatch(uiActions.setLoading(false))
            // console.log(response.data)
            // console.log(response.data)
            // dispatch(authActions.setRol(response.data.rol))
        }catch(err:any){
            dispatch(uiActions.setLoading(false))
            if(err.response.status == 401){
                redirectToLogin()
            }
            if(err.response.status == 400){
                toast.error(err.response.data.message)
            }
            // console.log('ERROR',err.response)
        }
    }
}

export const getSettings = () :ThunkAction<void,RootState,undefined,AnyAction> =>{
    return async(dispatch)=>{
        try{
            const response = await axios.get("/api/auth/settings")
            // console.log(response.data)
            dispatch(authActions.setSettings(response.data))
        }catch(err:any){    
            if(err.response.status == 401){
                redirectToLogin()
            }
            console.log('ERROR',err.response.data.success)
        }
    }
}

export const logout = () :ThunkAction<void,RootState,undefined,AnyAction> =>{
    return async()=>{
        await axios.get("/api/auth/logout")
        redirectToLogin()
    }
}

export const login =(email:string,password:string) :ThunkAction<void,RootState,undefined,AnyAction>=>{
    return async(dispatch)=>{
      console.log(email,password)

        try{
            dispatch(uiActions.setLoading(true))
            const formData = new FormData()
            formData.append('email',email)
            formData.append('password',password)
            const response = await fetch("/api/auth",{
                method:"post",
                body:JSON.stringify({email,password})
            })
            const dataRes = await response.json()
            const data = dataRes.user
            switch(response.status){
                case 200:
                    setCookie("_idCliente",data.idClient,{ maxAge:60*60*24 })
                    setCookie("_auth","0", {maxAge: 60 * 60 * 24})
                    localStorage.setItem("user",JSON.stringify(data))
                    localStorage.setItem('_rol',data.idRol)
                    dispatch(authActions.setRol(data.idRol))
                    setCookie('rol', data.idRol, { maxAge: 60 * 60 * 24,path:"/",sameSite:true });
                    if(typeof window != undefined){
                        const parsed = queryString.parse(window.location.search);  
                        if(parsed.redirect != undefined){
                            window.location.replace(parsed.redirect as string)
                        }else{
                            if(data.idClient == "1"){
                                window.location.replace(window.location.origin + "/reportes/facebook-data")
                            }else{
                                window.location.replace(window.location.origin)
                            }
                        }
                    }
                    
                case 400:
                    toast.error(dataRes.password)
                default:
                    console.log("")
            }
            
            dispatch(uiActions.setLoading(false))

        }catch(e:any){
            console.log(e.response.data)
            dispatch(uiActions.setLoading(false))
            const data = e.response.data
            dispatch(authActions.setErrrorLogin({
                password:data.error.password,
                email:data.error.email
            }))
            // toast.error(data.error.password)
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
  