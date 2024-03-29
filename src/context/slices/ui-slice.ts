import { PaginationProps, UiState } from "../../data/models/type/ui-model";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const initialUiState :UiState ={
    loading:false,
    sidebar:false,
    innerLoading:false,
    openDialog:false,
    errorMessage:"",
    buttonText:"Continuar con facebook",
    isMobile:false,
    initAnimation:true,
    pathName:'',
    execute:false,
    totalCount:undefined,
}

const uiSlice = createSlice({
    name:'ui',
    initialState:initialUiState,
    reducers:{
        setTotalCount(state,action:PayloadAction<number>){
            state.totalCount = action.payload
        },
        setOpenSidebar(state,action:PayloadAction<boolean>){
            state.sidebar = action.payload
        },
        setExecute(state,action:PayloadAction<boolean>){
            state.execute = action.payload
        },
        setOpenDialog(state,action:PayloadAction<boolean>){
            state.openDialog = action.payload
        },
        setLoading(state,action:PayloadAction<boolean>){
            state.loading = action.payload
        },
        setInnerLoading(state,action:PayloadAction<boolean>){
            state.innerLoading = action.payload
        },
        setButtonText(state,action:PayloadAction<string>){
            state.buttonText = action.payload
        },
        setDevice(state,action:PayloadAction<boolean>){
            state.isMobile = action.payload
        },
        setInitAnimation(state,action:PayloadAction<boolean>){
            state.initAnimation = action.payload
        },
        setPathName(state,action:PayloadAction<string>){
            state.pathName = action.payload
        },
    }
})


export const uiActions = uiSlice.actions

export default uiSlice