import { getSplashPageByCode } from "@/context/actions/splashActions";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import { splashActions } from "@/context/slices/splash-slice";
import { uiActions } from "@/context/slices/ui-slice";
import { Button } from "flowbite-react";
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
        <ToastContainer
        position={"bottom-center"}
        />
        <div className=" min-w-[1300px] relative max-w-[1800px] mx-auto">
            <div className="fixed left-0 top-0 flex justify-between p-2 w-full bg-white shadow-md z-20">
            <Button color="light"  onClick={()=>router.push("/splash/pages")}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                    stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                  </Button>
            <Button.Group>
                    {/* <Button color="light" onClick={()=>router.push("")}
                    className={`${router.pathname == "" && "text-primary"}`}>
                        Crear Portal
                    </Button> */}
                    <Button color="light" onClick={()=>router.push(`/splash/edit/desktop-view?code=${code}`)}
                       className={`${router.pathname == "/splash/edit/desktop-view" && "text-primary"}`}>
                        Desktop View
                    </Button>
                    <Button color="light" onClick={()=>router.push(`/splash/edit/mobile-view?code=${code}`)} 
                       className={`${router.pathname == "/splash/edit/mobile-view" && "text-primary"}`}>
                        Mobile View
                    </Button>
                    <Button color="light" onClick={()=>router.push(`/splash/edit/auth-method?code=${code}`)}
                       className={`${router.pathname == "/splash/edit/auth-method" && "text-primary"}`}>
                        Method
                    </Button>
                    <Button color="light" onClick={()=>{
                        router.push(`/splash/edit?code=${code}`)
                        dispatch(splashActions.setHtmlCode(undefined))
                    }}
                       className={`${router.pathname == "/splash/edit" && "text-primary"}`}>
                        Editar
                    </Button>
                    <Button color="light" onClick={()=>{
                        router.push(`/splash/edit/html?code=${code}`)
                        dispatch(splashActions.setHtmlCode(undefined))
                    }}
                       className={`${router.pathname == "/splash/edit/html" && "text-primary"}`}>
                        Html
                    </Button>
                  </Button.Group>
                  <Button disabled={!showSaveButton} color="light" onClick={()=>{
                    dispatch(uiActions.setOpenDialog(true))
                    }}>
                    Guardar Cambios
                  </Button>
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