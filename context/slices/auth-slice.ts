import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { AuthModel, ErrorLogin } from "../../data/models/redux-models/auth-model";



const initialAuthState:AuthModel = {
    authLoading:false,
    isAuthenticated:false,
    rol:undefined,
    errorLogin:undefined,
    username:'',
    postUrl:'https://www.facebook.com/667567951730217/posts/625859722567707',
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
        setRol(state,action:PayloadAction<string>){
            state.rol = action.payload
        },
        setAuthLoading(state,action:PayloadAction<boolean>){
            state.authLoading = action.payload
        },
        setAuthenticated(state,action:PayloadAction<boolean>){
            state.isAuthenticated = action.payload
        },
        setUsername(state,action:PayloadAction<string>){
            state.username = action.payload
        },
        setPostUrl(state,action:PayloadAction<string>){
            state.postUrl = action.payload
        },
        setErrrorLogin(state,action:PayloadAction<ErrorLogin | undefined>){
            state.errorLogin = action.payload
        }
    }
})

export const authActions = authSlice.actions

export default authSlice