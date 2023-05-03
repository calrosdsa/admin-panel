
import React,{Fragment} from 'react'
import { Dialog,Transition } from '@headlessui/react'

 interface Props{
   openModal:boolean,
   closeModal:(bool:boolean)=>void,
   title?:string,
   descripcion?:string,
   buttonText?:string,
   buttonText2?:string,
   descartar:()=>void,
   performAction?:()=>void
  //  providers:Record<LiteralUnion<BuiltInProviderType, string>,ClientSafeProvider>
 }


const DialogConfirmation:React.FC<Props>=({
  openModal,closeModal,
  title = "¿Desea continuar con la acción solicitada?",
  descripcion = "Por favor, confirme si desea continuar.",
  buttonText="Descartar",
  buttonText2="Confirmar",
  descartar,performAction
})=> {
//   const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   }
  return (
    <Transition appear show={openModal} as={Fragment}>
    <Dialog as='div' className="relative z-10" open={openModal} onClose={() =>{
      closeModal(false)
    }}>
    <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>
        <div className='fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full max-w-sm'>
      <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                
              >
      <Dialog.Panel>
        <div className='rounded-lg bg-white p-2'>
             <div className=' space-y-3'>
              <div className='flex justify-between items-center'>
                  <span className="font-semibold p-2 text-lg">{title}</span>             
                  <svg onClick={()=>closeModal(false)} 
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" 
            stroke="currentColor" className="w-7 h-7 cursor-pointer">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                   </svg>
             </div>
                   <span>{descripcion}</span>
                   <div className='grid grid-cols-2 place-items-center border-t-[1px] text-lg'>
                       <span  onClick={()=>descartar()}
                        className='cursor-pointer hover:bg-gray-200 w-full justify-center border-r-[1px] flex p-2'>{buttonText}</span>
                       <span onClick={()=>{
                        if(performAction != undefined){
                          performAction()}
                        }
                      } 
                       className='cursor-pointer hover:bg-gray-200 w-full justify-center flex p-2'>{buttonText2}</span>
                   </div>
             </div>
        </div>
    </Dialog.Panel>
    </Transition.Child>
    </div>
    </Dialog>
    </Transition>
  )
}

export default DialogConfirmation;

