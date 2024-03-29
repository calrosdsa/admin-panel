import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { Conexiones, Dispositivo, Encuesta, Order, UserBusiness, UserList, UserSolicitud, UserState, UserTabDetail, UserWifi } from "../../data/models/type/user-models";

const initialUserState:UserState ={
    solicitudes:[],
    params:"Todos",
    ids:[],
    userPagination:undefined,
    conexiones:[],
    dispositivos:[],
    user:undefined,
    userTabDetail:UserTabDetail.CONEXIONES,
    encuestas:[],
    userBussiness:[]
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
        setUserBussiness(state,action:PayloadAction<UserBusiness[]>){
            state.userBussiness = action.payload
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
        setUsersWifi(state,action:PayloadAction<UserList | undefined>){ 
            state.userPagination = action.payload
        },
        setEncuestas(state,action:PayloadAction<Encuesta[]>){
            state.encuestas = action.payload
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