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
import { setCookie } from "cookies-next";
import { redirectToLogin } from ".";
import { toast } from "react-toastify";

export const authActions = authSlice.actions


export const getUserData = () :ThunkAction<void,RootState,undefined,AnyAction> =>{
    return async(dispatch)=>{
        try{
            const response = await axios.get("/api/auth/token")
            console.log(response.data)
            dispatch(authActions.setRol(response.data.rol))
        }catch(err:any){
            if(err.response.status == 401){
                redirectToLogin()
            }
            console.log('ERROR',err.response.data.success)
        }
    }
}

export const logout = () :ThunkAction<void,RootState,undefined,AnyAction> =>{
    return async(dispatch)=>{
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
            
            // const response =await axios.post(`${API_URL}/apiFB/public/auth/login`,formData)
            const response = await axios.post("/api/auth",{email,password})
            console.log(response)
            // setCookie('access_token', response.data.res.access_token, {maxAge:60 * 60 * 24});
            // localStorage.setItem('token',response.data.access_token)
            if(response.status == 200){
               setCookie("_auth","0", {maxAge: 60 * 60 * 24})
                if(typeof window != undefined){
                    const parsed = queryString.parse(window.location.search);  
                    if(parsed.redirect != undefined){
                        window.location.replace(parsed.redirect as string)
                    }else{
                        window.location.replace(window.location.origin)
                    }

                }
            }
            dispatch(uiActions.setLoading(false))

        }catch(e:any){
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
  