import { getSplashPageByCode } from "@/context/actions/splashActions";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import { splashActions } from "@/context/slices/splash-slice";
import { uiActions } from "@/context/slices/ui-slice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import DialogConfirmation from "../dialog/DialogConfirmation";

interface Props {
    children:React.ReactNode,
    saveChanges?:()=>void
}
const EditLayout = ({children,saveChanges}:Props) =>{
    const [confirmSave,setConfirmSave] = useState(false)
    const router = useRouter();
    const { code } = router.query
    const dispatch = useAppDispatch();
    const uiState = useAppSelector(state=>state.ui);
    const showSaveButton = router.pathname == "/splash/edit" || router.pathname == "/splash/edit/html" || router.pathname == "/splash/edit/auth-method" ;

    

   
    return(
        <>
        <div className=" min-w-[1300px] relative max-w-[1800px] mx-auto text-sm">
        <ToastContainer
        position={"bottom-center"}
        />
            <div className="fixed left-0 top-0 flex justify-between p-2 w-full bg-white shadow-md z-20">
            <button className=" flex space-x-1 py-2 border-[1px] border-gray-300 items-center bg-white hover:bg-gray-200 
       active:ring-blue-300 active:ring-2 px-3"  onClick={()=>router.push("/splash/pages")}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                    stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                  </button>
            <div className="flex flex-wrap">
                    {/* <button  onClick={()=>router.push("")}
                    className={`${router.pathname == "" && "text-primary"}`}>
                        Crear Portal
                    </button> */}
                    <button  onClick={()=>router.push(`/splash/edit/desktop-view?code=${code}`)}
                       className={` flex space-x-1 py-2 border-[1px] border-gray-300 items-center bg-white hover:bg-gray-200 
                       active:ring-blue-300 active:ring-2 px-3 ${router.pathname == "/splash/edit/desktop-view" && "text-primary"}`}>
                        Desktop View
                    </button>
                    <button  onClick={()=>router.push(`/splash/edit/mobile-view?code=${code}`)} 
                       className={` flex space-x-1 py-2 border-[1px] border-gray-300 items-center bg-white hover:bg-gray-200 
                       active:ring-blue-300 active:ring-2 px-3 ${router.pathname == "/splash/edit/mobile-view" && "text-primary"}`}>
                        Mobile View
                    </button>
                    <button  onClick={()=>router.push(`/splash/edit/auth-method?code=${code}`)}
                       className={` flex space-x-1 py-2 border-[1px] border-gray-300 items-center bg-white hover:bg-gray-200 
                       active:ring-blue-300 active:ring-2 px-3 ${router.pathname == "/splash/edit/auth-method" && "text-primary"}`}>
                        Method
                    </button>
                    <button  onClick={()=>{
                        router.push(`/splash/edit?code=${code}`)
                        dispatch(splashActions.setHtmlCode(undefined))
                    }}
                       className={` flex space-x-1 py-2 border-[1px] border-gray-300 items-center bg-white hover:bg-gray-200 
                       active:ring-blue-300 active:ring-2 px-3 ${router.pathname == "/splash/edit" && "text-primary"}`}>
                        Editar
                    </button>
                    <button  onClick={()=>{
                        router.push(`/splash/edit/html?code=${code}`)
                        dispatch(splashActions.setHtmlCode(undefined))
                    }}
                       className={` flex space-x-1 py-2 border-[1px] border-gray-300 items-center bg-white hover:bg-gray-200 
                       active:ring-blue-300 active:ring-2 px-3 ${router.pathname == "/splash/edit/html" && "text-primary"}`}>
                        Html
                    </button>
                  </div>
                  <button disabled={!showSaveButton} className=" flex space-x-1 py-2 border-[1px] border-gray-300 items-center bg-white hover:bg-gray-200 
       active:ring-blue-300 active:ring-2 px-3" onClick={()=>{
                    dispatch(uiActions.setOpenDialog(true))
                    }}>
                    Guardar Cambios
                  </button>
            </div>
            <div className={`${uiState.loading ? " opacity-0 transition-all":" opacity-100 transition-all"}`}>
            {children}
            </div>
        </div>
        
        <DialogConfirmation
    title="¿Desea guardar los cambios?"
    descripcion="Los cambios realizados serán guardados si decide continuar."
    openModal={uiState.openDialog}
    closeModal={()=>dispatch(uiActions.setOpenDialog(false))}
    buttonText2="Guardar cambios"
    descartar={()=>dispatch(uiActions.setOpenDialog(false))}
    performAction={saveChanges}
    />
        </>
    )
}

export default EditLayout;