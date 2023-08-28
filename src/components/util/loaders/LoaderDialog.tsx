
import React,{Fragment} from 'react'
import { Dialog,Transition } from '@headlessui/react'
import Loader from './Loader';

 interface Props{
   openModal:boolean,
 }


const DialogLoader:React.FC<Props>=({
  openModal,
})=> {
//   const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   }
  return (
    <Transition appear show={openModal} as={Fragment}>
    <Dialog as='div' className="relative z-30" open={openModal} onClose={() =>{
    }}>
    <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 z-30" />
      </Transition.Child>
        <div className='fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full max-w-sm'>
      <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                
              >
      <Dialog.Panel>
        <div>
        <Loader
                className="absolute top-1/2 left-1/2 
                -translate-x-1/2 -translate-y-1/2"
                />
        </div>
    </Dialog.Panel>
    </Transition.Child>
    </div>
    </Dialog>
    </Transition>
  )
}

export default DialogLoader;

