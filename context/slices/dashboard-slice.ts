import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { DashBoardState, LikeData } from "../../data/models/redux-models/dashboard-model";


const initialDashboardState :DashBoardState ={
    likesForWeek:[],
    likesForWeekUserWifi:[],
    ongoingProcess:[],
}

const dashboardSlice = createSlice({
    name:'dashboard',
    initialState:initialDashboardState,
    reducers:{
        setLikeDataForWeek(state,action:PayloadAction<LikeData[]>){
            state.likesForWeek = action.payload
        },
        setLikeDataForLikesUserWifi(state,action:PayloadAction<LikeData[]>){
            state.likesForWeekUserWifi = action.payload
        },
        setOngoingProcess(state,action:PayloadAction<number>){
            state.ongoingProcess = [...state.ongoingProcess,action.payload]
        },
        removeOngoingProcess(state,action:PayloadAction<number>){
            state.ongoingProcess = state.ongoingProcess.filter(item=>item != action.payload)
        },
    }
})


export const dashboardAction = dashboardSlice.actions

export default dashboardSlice