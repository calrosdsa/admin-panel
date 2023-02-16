import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { Order, UserSolicitud, UserState } from "../../data/models/redux-models/user-models";

const initialUserState:UserState ={
    solicitudes:[],
    params:"All",
    ids:[]
}

const userSlice = createSlice({
    name:"user",
    initialState:initialUserState,
    reducers:{
        setSolicitudList(state,action:PayloadAction<UserSolicitud[]>){
            state.solicitudes = action.payload
        },
        changeSolicitudState(state,action:PayloadAction<string>){
            state.params = action.payload
        },
        addId(state,action:PayloadAction<string>){
            state.ids = [...state.ids ,action.payload]
        },
        removeId(state,action:PayloadAction<string>){
            state.ids = state.ids.filter(item=>item!= action.payload)
        },
        clearListIdsSolicitudes(state){
            state.ids = []
        },
        orderSolicitudList(state,action:PayloadAction<Order>){
            if(action.payload == Order.ASCENDENTE){
                state.solicitudes =  state.solicitudes.sort(function (left, right) {
                    return moment.utc(left.dateRequest).diff(moment.utc(right.dateRequest))
                });
            }else if(action.payload == Order.DESCENDENTE){
                state.solicitudes =  state.solicitudes.sort(function (left, right) {
                    return moment.utc(right.dateRequest).diff(moment.utc(left.dateRequest))
                });
            }
        }
    }
})

export const userActions = userSlice.actions

export default userSlice