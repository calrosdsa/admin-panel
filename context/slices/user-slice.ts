import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSolicitud, UserState } from "../../data/models/redux-models/user-models";

const initialUserState:UserState ={
    solicitudes:[]
}

const userSlice = createSlice({
    name:"user",
    initialState:initialUserState,
    reducers:{
        setSolicitudList(state,action:PayloadAction<UserSolicitud[]>){
            state.solicitudes = action.payload
        }
    }
})

export const userActions = userSlice.actions

export default userSlice