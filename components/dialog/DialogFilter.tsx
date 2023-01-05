import React,{ createElement, Fragment,SetStateAction,useEffect,useState } from 'react'
import { Dialog,Transition } from '@headlessui/react'

interface Props {
    closeDialog:()=>void
    open:boolean
    id:string
    permalink:string
}

const DialogFilter = ({closeDialog,open,id,permalink}:Props) => {   

  
    const navigateToPost = ()=>{
      let link = document.createElement('a')
      link.href = permalink
      link.target = '_blank'
      link.rel = 'noreferrer'
      link.click()
    }
    
    

    return(
      <>
      
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>{
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white 
                 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl line-clamp-2 px-4 py-2 font-semibold leading-6 text-gray-900"
                  >
                    Filtros 
                  </Dialog.Title>
                  <div className='flex flex-col pb-2'>
                    <span onClick={navigateToPost}
                    className='p-3 hover:bg-gray-100 border-b-[1px] cursor-pointer'>Ir a la publicacion</span>
                    <span className='p-3 hover:bg-gray-100 border-b-[1px] cursor-pointer'>Ir a la publicacion</span>
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

export default DialogFilter;