import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { DashBoardState, LikeData } from "../../data/models/redux-models/dashboard-model";


const initialDashboardState :DashBoardState ={
    likesForWeek:[],
}

const dashboardSlice = createSlice({
    name:'dashboard',
    initialState:initialDashboardState,
    reducers:{
        setLikeDataForWeek(state,action:PayloadAction<LikeData[]>){
            state.likesForWeek = action.payload
        },
    }
})


export const dashboardAction = dashboardSlice.actions

export default dashboardSlice