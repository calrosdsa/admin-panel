import React,{ createElement, Fragment,SetStateAction,useEffect,useState } from 'react'
import { Dialog,Transition } from '@headlessui/react'
import { useAppDispatch, useAppSelector } from '../../context/reduxHooks'
import { donwloadReportById } from '../../context/actions/dashboardActions'
import { toast } from 'react-toastify'
import { ReporteId } from '../../data/models/type/dashboard-model'

interface Props {
    closeDialog:()=>void
    open:boolean
    id:string
    permalink:string
}

const PostOptions = ({closeDialog,open,id,permalink}:Props) => {   
  const dispatch = useAppDispatch()
  const dashboardState = useAppSelector(state=>state.dashboard)
  
    const navigateToPost = ()=>{
      let link = document.createElement('a')
      link.href = permalink
      link.target = '_blank'
      link.rel = 'noreferrer'
      link.click()
    }
    

     const downloadReport = (userwifi:string,idProgress:number)=>{
      if(dashboardState.ongoingProcess.includes(idProgress)){
        toast.info("Hay una descarga en curso.")
      }else{
        dispatch(donwloadReportById(id,userwifi,idProgress))
      }
     }
    

    return(
      <>
      
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={()=>{
            closeDialog()
            }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 z-20" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto z-20">
            <div className="flex min-h-full items-center justify-center p-4 text-center z-20">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white  z-20
                 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl line-clamp-2 px-4 py-2 font-semibold leading-6 text-gray-900"
                  >
                    Opciones  
                  </Dialog.Title>
                  <div className='flex flex-col pb-2'>
                    <span onClick={navigateToPost}
                    className='p-3 hover:bg-gray-100 border-b-[1px] cursor-pointer'>Ir a la publicacion.</span>
                    <span onClick={()=>downloadReport("0",ReporteId.ALL_USER_POST)} 
                    className='p-3 hover:bg-gray-100 border-b-[1px] cursor-pointer'>Descargar reporte general.</span>
                     <span onClick={()=>downloadReport("1",ReporteId.USER_RED_POST)} 
                    className='p-3 hover:bg-gray-100 border-b-[1px] cursor-pointer'>Descargar reporte (solo usuarios de la red).</span>
            </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      </>
    )
}

export default PostOptions;