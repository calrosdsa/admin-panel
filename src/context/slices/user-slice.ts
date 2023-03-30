import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { Conexiones, Dispositivo, Order, UserSolicitud, UserState, UserTabDetail, UserWifi } from "../../data/models/redux-models/user-models";

const initialUserState:UserState ={
    solicitudes:[],
    params:"Todos",
    ids:[],
    users:[],
    conexiones:[],
    dispositivos:[],
    user:undefined,
    userTabDetail:UserTabDetail.CONEXIONES
}

const userSlice = createSlice({
    name:"user",
    initialState:initialUserState,
    reducers:{
        resetForUserDetail(state){
            state.user = undefined
            state.conexiones = []
            state.dispositivos = []
            state.userTabDetail = UserTabDetail.CONEXIONES
        }, 
        setUserWifi(state,action:PayloadAction<UserWifi | undefined>){
            state.user = action.payload
        },
        setUserTabDetail(state,action:PayloadAction<UserTabDetail>){
            state.userTabDetail = action.payload
        },
        setDispositivos(state,action:PayloadAction<Dispositivo[]>){
            state.dispositivos = action.payload
        },
        setConexiones(state,action:PayloadAction<Conexiones[]>){
            state.conexiones = action.payload
        },
        setUsersWifi(state,action:PayloadAction<UserWifi[]>){
            state.users = action.payload
        },
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
        },
        orderSolicitudListByName(state,action:PayloadAction<Order>){
            if(action.payload == Order.ASCENDENTE){
                state.solicitudes =  state.solicitudes.sort(function (a, b) {
                    return ('' + a.fullName).localeCompare(b.fullName);
                });
            }else if(action.payload == Order.DESCENDENTE){
                state.solicitudes =  state.solicitudes.sort(function (a, b) {
                    return ('' + b.fullName).localeCompare(a.fullName);
                });
            }
        }
    }
})

export const userActions = userSlice.actions

export default userSlice