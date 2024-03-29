import { useState } from "react";
import { changeSolicitudState, getSolicitudList } from "../../../context/actions/userActions";
import { useAppDispatch } from "../../../context/reduxHooks";
import { userActions } from "../../../context/slices/user-slice";
import DropDown from "./DropDown";

interface Props {
    params:string
    ids:string[]
    refreshList:()=>void    
}
const SolicitudOption = ({params,ids,refreshList}:Props)=>{
    const dispatch = useAppDispatch()
    const isDisabled = ids.length == 0
    const disabledButton = isDisabled && "disabled"
    const changeParam = (param:string)=>{
        dispatch(getSolicitudList(param))
        dispatch(userActions.changeSolicitudState(param))
    }
    return(
        <div>
            <div className={`flex border-b-[1px] border-gray-500 overflow-x-auto overflow-hidden scrollhidden`}>
            <span onClick={()=>changeParam("Todos")}
            className={`textOption ${params == "Todos" && "text-primary border-b-2 pb-3 border-primary"}`}>Todo</span>
                <span onClick={()=>changeParam("Habilitado")}
                className={`textOption border-x-[1px] border-gray-500 ${params == "Habilitado" && "text-primary border-b-2 pb-3 border-primary"}`}>Aceptados</span>
                <span onClick={()=>changeParam("Pendiente")}
                className={`textOption border-r-[1px] border-gray-500 ${params == "Pendiente" && "text-primary border-b-2 pb-3 border-primary"}`}>Pendientes</span>
                <span onClick={()=>changeParam("Rechazado")}
                 className={`textOption border-r-[1px] border-gray-500
                  ${params == "Rechazado" && "text-primary border-b-2 pb-3 border-primary"}`}>Rechazados</span>
                 <span onClick={()=>changeParam("Deshabilitado")}
                 className={`textOption ${params == "Deshabilitado" && "text-primary border-b-2 pb-3 border-primary"}`}>Deshabilitados</span>
            </div>

            <div className="flex flex-wrap space-x-2 mt-2 py-2 gap-y-2">
            <button onClick={refreshList} className="button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
            stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            </button>

            <button disabled={isDisabled} className={`button  ${disabledButton && "disabled pointer-events-none "}`} onClick={()=>dispatch(changeSolicitudState("Eliminado"))}>
            <span>Delete</span>
            </button>

           <DropDown 
           ids={ids}/>

           {/* <Button color="light" className=" rounded-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <span>Descargar Reporte</span>
            </Button> */}
            

        </div>

        </div>
    )
}

export default SolicitudOption;