import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { BasicPortal, SplashPage, SplashState } from "../../data/models/redux-models/splash-data";


const initialSplashState :SplashState ={
    splashPages:[],
    splashPage:undefined,
    splashBaseUrl:undefined,
    htmlCode:undefined,
    basicPortal:undefined
}

const splashSlice = createSlice({
    name:'splash',
    initialState:initialSplashState,
    reducers:{
        setSplashPages(state,action:PayloadAction<SplashPage[]>){
            state.splashPages = action.payload
        },
        setSplashPage(state,action:PayloadAction<SplashPage | undefined>){
            state.splashPage = action.payload
        },
        setHtmlCode(state,action:PayloadAction<string | undefined>){
            state.htmlCode = action.payload
        },
        setSplashBaseUrl(state,action:PayloadAction<string>){
            state.splashBaseUrl = action.payload
        },
        setSplashData(state,action:PayloadAction<BasicPortal>){
            state.basicPortal = {...state.basicPortal,...action.payload}
        }
      
    }
})


export const splashActions = splashSlice.actions

export default splashSlice