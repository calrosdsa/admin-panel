"use client"
import DialogConfirmation from "@/components/dialog/DialogConfirmation";
import Layout from "@/components/layout/layout";
import CreateUserNegocioDialog from "@/components/manage/users/CreateUserNegocioDialog";
import UpdateUserNegocioDialog from "@/components/manage/users/UpdateUserNegocioDialog";
import Loader from "@/components/util/loaders/Loader";
import { getUserBussinessList } from "@/context/actions/userActions";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import { uiActions } from "@/context/slices/ui-slice";
import { UserBusiness } from "@/data/models/type/user-models";
import { getUserBussinessRolName } from "@/utils/converter";
import {useState,useEffect} from 'react'
import { toast } from "react-toastify";


export default function Usuarios(){
    const dispatch = useAppDispatch()
    const userBussiness = useAppSelector(state=>state.user.userBussiness)
    const loading = useAppSelector(state=>state.ui.loading)
    const [currentUser,setCurrentUser] = useState<undefined | UserBusiness>(undefined)
    const [openDialogCreateUser,setOpenDialogCreateUser] = useState(false)
    const [confirmDeletedUser,setConfirmDeletedUser] = useState(false)
    const [openUpdateUser,setOpenUpdateUser] = useState(false)

    const selectUser = (user:UserBusiness) =>{
        setCurrentUser(user)
    }
    const deleteUser = async() =>{
        try{
            dispatch(uiActions.setLoading(true))
            setConfirmDeletedUser(false)
            const res = await fetch("/api/user/bussiness/delete",{
                method:"POST",
                body:JSON.stringify({id:currentUser?.id})
              })
              toast.info(`Se ha eliminado al usuario ${currentUser?.fullName}`)
            const data = await res.json()
            console.log(data)
            dispatch(getUserBussinessList())  
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        if(userBussiness.length > 0){
            setCurrentUser(userBussiness[0])
        }
    },[userBussiness])
    useEffect(()=>{
        dispatch(getUserBussinessList())
    },[])
    return(
        <>
        {openDialogCreateUser&&
        <CreateUserNegocioDialog
        openModal={openDialogCreateUser}
        closeModal={()=>setOpenDialogCreateUser(false)}
        />
    }
    {(openUpdateUser && currentUser != undefined) &&
        <UpdateUserNegocioDialog
        openModal={openUpdateUser}
        closeModal={()=>setOpenUpdateUser(false)}
        user={currentUser}
        />
    }
        {confirmDeletedUser&&
    <DialogConfirmation
        closeModal={()=>setConfirmDeletedUser(false)}
        openModal={confirmDeletedUser}
        descripcion={`Si desea continuar, se eliminará el usuario ${currentUser?.fullName}`}
        performAction={()=>deleteUser()}
        descartar={()=>setConfirmDeletedUser(false)}
        />
        }
        <Layout>
        <div className="p-2 h-screen pt-10 xl:pt-2">

            <div className="grid xl:grid-cols-7 h-full gap-2">
                <div className=" col-span-2 bg-white  rounded-lg shadow-lg p-2 overflow-auto relative">
                    <div className="flex justify-between items-center border-b-2 pb-2">
                    <span className="headline">Usuarios</span>
                    <button onClick={()=>setOpenDialogCreateUser(true)}
                     className="buttonPrimary flex space-x-2">
                        <span>Agregar usuario</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                        stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                   </svg>

                        </button>
                    </div>
                    {/* {loain} */}
                    {loading && <Loader className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/> }

                    {userBussiness.map((item,idx)=>{
                        return(
                            <div key={idx} onClick={()=>selectUser(item)}
                            className={`p-2 hover:bg-gray-100 cursor-pointer border-b-[1px] flex flex-col
                            ${currentUser?.id == item.id && "bg-gray-100"}`}>
                                <span className="">{item.fullName}</span>
                                {/* <span className="text-sm">{item.email}</span> */}
                            </div>
                        )
                    })}
                   
                </div>
                <div className="col-start-3 col-span-full bg-white  rounded-lg shadow-lg p-2 relative">
                    {loading && <Loader className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/> }
                    {currentUser != undefined &&                     
                    <div className="flex justify-between items-center px-2">

                    <div className="grid w-full">
                        <span className="font-medium text-lg w-10/12 truncate">{currentUser.fullName}</span>
                        <span className="text-xs">{currentUser.email}</span>
                        <span>{getUserBussinessRolName(Number(currentUser.idRol))}</span>
                    </div>

                    <div className="flex space-x-8">
                        <svg onClick={()=>setConfirmDeletedUser(true)}
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        <svg onClick={()=>setOpenUpdateUser(true)}
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </div>
                    </div>
                    }
                </div>
            </div>

        </div>
        </Layout>
        </>
    )
}