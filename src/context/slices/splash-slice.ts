import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { BasicPortal, ConnectionMethod, SplashPage, SplashState } from "../../data/models/type/splash-data";
import { Payload } from "recharts/types/component/DefaultLegendContent";


const initialSplashState :SplashState ={
    splashPages:[],
    connection_methods:[],
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
        setConnectionMethods(state,action:PayloadAction<ConnectionMethod[]>){
            state.connection_methods = action.payload
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
        },
        clearPortalData(state){
            state.basicPortal = undefined
        }
      
    }
})


export const splashActions = splashSlice.actions

export default splashSlice