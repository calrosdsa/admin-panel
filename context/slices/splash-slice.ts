import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { SplashPage, SplashState } from "../../data/models/redux-models/splash-data";


const initialSplashState :SplashState ={
    splashPages:[],
    splashPage:undefined
}

const splashSlice = createSlice({
    name:'splash',
    initialState:initialSplashState,
    reducers:{
        setSplashPages(state,action:PayloadAction<SplashPage[]>){
            state.splashPages = action.payload
        },
        setSplashPage(state,action:PayloadAction<SplashPage>){
            state.splashPage = action.payload
        }
      
    }
})


export const splashActions = splashSlice.actions

export default splashSlice