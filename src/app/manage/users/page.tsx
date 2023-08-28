"use client"
import Layout from "@/components/layout/layout";
import CreateUserNegocioDialog from "@/components/manage/users/CreateUserNegocioDialog";
import {useState} from 'react'


export default function Usuarios(){
    const [openDialogCreateUser,setOpenDialogCreateUser] = useState(false)
    return(
        <>
        {openDialogCreateUser&&
        <CreateUserNegocioDialog
        openModal={openDialogCreateUser}
        closeModal={()=>setOpenDialogCreateUser(false)}
        />
        }
        <Layout>
        <div className="p-2 h-screen">

            <div className="grid grid-cols-7 h-full gap-x-2">
                <div className=" col-span-2 bg-white  rounded-lg shadow-lg p-2">
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
                </div>
                <div className="col-start-3 col-span-full bg-white  rounded-lg shadow-lg p-2">

                </div>
            </div>

        </div>
        </Layout>
        </>
    )
}