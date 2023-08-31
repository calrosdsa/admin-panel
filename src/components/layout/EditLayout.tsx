"use client"
import { getSplashPageByCode } from "@/context/actions/splashActions";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import { splashActions } from "@/context/slices/splash-slice";
import { uiActions } from "@/context/slices/ui-slice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import DialogConfirmation from "../dialog/DialogConfirmation";
import Loader from "../util/loaders/Loader";
import { Dialog } from "@headlessui/react";
import DialogLoader from "../util/loaders/LoaderDialog";

interface Props {
    children:React.ReactNode,
    saveChanges?:()=>void
}
const EditLayout = ({children,saveChanges}:Props) =>{
    const [confirmSave,setConfirmSave] = useState(false)
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams()
    const code = params.get("code")
    const dispatch = useAppDispatch();
    const uiState = useAppSelector(state=>state.ui);
    const showSaveButton = pathname == "/splash/edit" || pathname == "/splash/edit/html" || pathname == "/splash/edit/settings" ;
    const portal = useAppSelector(state=>state.splash.basicPortal)

    

   
    return(
        <>
          {uiState.loading &&
          <DialogLoader
          openModal={uiState.loading}
          />
            }
        {/* <div>
        <Dialog open={uiState.loading} onClose={()=>{}}>
                <div className=" fixed inset-0 bg-black bg-opacity-25"></div>
        </Dialog>
            </div> */}
        <div className="relative max-w-[1800px] mx-auto text-sm ">
        <ToastContainer
        position={"bottom-center"}
        />
            <div className="fixed left-0 top-0 flex justify-between p-2 w-full bg-white shadow-md z-20 overflow-auto
             space-x-3 whitespace-nowrap">
            <button className=" button"  onClick={()=>router.push("/splash/pages")}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                    stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                  </button>
            <div className="flex">
                    {/* <button  onClick={()=>router.push("")}
                    className={`${pathname == "" && "text-primary"}`}>
                        Crear Portal
                    </button> */}
                    <button  onClick={()=>router.push(`/splash/edit/desktop-view?code=${code}`)}
                       className={` button ${pathname == "/splash/edit/desktop-view" && "text-primary"}`}>
                        Desktop View
                    </button>
                    <button  onClick={()=>router.push(`/splash/edit/mobile-view?code=${code}`)} 
                       className={` button ${pathname == "/splash/edit/mobile-view" && "text-primary"}`}>
                        Mobile View
                    </button>
                    <button  onClick={()=>router.push(`/splash/edit/settings?code=${code}`)}
                       className={` button ${pathname == "/splash/edit/settings" && "text-primary"}`}>
                        Ajustes
                    </button>
                    <button  onClick={()=>{
                        router.push(`/splash/edit?code=${code}`)
                        dispatch(splashActions.setHtmlCode(undefined))
                    }}
                       className={` button ${pathname == "/splash/edit" && "text-primary"}`}>
                        Editar
                    </button>
                  </div>
                  <div className="flex space-x-3">
                  <button  className=" button underline" onClick={()=>{
                      window.open(portal?.portal.url)
                    }}>
                    Ver portal
                  </button>
                  <button disabled={!showSaveButton} className={`button ${!showSaveButton && "disabled"}`}
                   onClick={()=>{dispatch(uiActions.setOpenDialog(true))}}>
                    Guardar Cambios
                  </button>
                </div>
            </div>
            <div className={` pt-16 px-2`}>
              
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