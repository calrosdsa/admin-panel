
import React,{FormEvent, Fragment, useState} from 'react'
import { Dialog,Transition } from '@headlessui/react'
import DialogHeader from '../DialogHeader'
import InputPassword from '@/components/util/InputPassword'
import ButtonSubmit from '@/components/util/ButtonSubmit'
import DialogConfirmation from '../DialogConfirmation'
import { resetPassword } from '@/context/actions/authActions'
import { useAppDispatch } from '@/context/reduxHooks'

 interface Props{
   openModal:boolean,
   closeModal:()=>void,
 }


const ResetPasswordDialog:React.FC<Props>=({
  openModal,closeModal,
})=> {
    const [openDialogConfirm,setOpenDialogConfirm] = useState(false)
    const dispatch = useAppDispatch()
    const [formData,setFormData]=useState({
        password:"",
        newPassword:"",
        newPasswordConfirm:""
    })
    const {password,newPassword,newPasswordConfirm} = formData
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const onSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(newPassword != newPasswordConfirm){
        window.alert("Contraseña no coinciden")
        return
    }
   dispatch(resetPassword(password,newPassword))
  }
  return (
    <>
    {openDialogConfirm&&
    <DialogConfirmation
    performAction={closeModal}
    descartar={()=>setOpenDialogConfirm(false)}
    openModal={openDialogConfirm}
    closeModal={()=>setOpenDialogConfirm(false)}
    />
    }
    <Transition appear show={openModal} as={Fragment}>
    <Dialog as='div' className="relative z-10" open={openModal} onClose={() =>{
      setOpenDialogConfirm(true)
    }}>
    <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>
        <div className='fixed inset-0 max-w-lg  mx-auto top-1/2 -translate-y-1/2 '>
      <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                
              >
      <Dialog.Panel>
        <div className='rounded-lg bg-white p-2'>
            <DialogHeader
            title='Resetear Contraseña'
            close={()=>setOpenDialogConfirm(true)}
            />
            <form onSubmit={onSubmit}>

            <InputPassword
            onChange={onChange}
            password={password}
            name='password'
            label='Contraseña Actual'
            />
             <InputPassword
            onChange={onChange}
            password={newPassword}
            name='newPassword'
            label='Nueva Contraseña'
            />
             <InputPassword
            onChange={onChange}
            password={newPasswordConfirm}
            name='newPasswordConfirm'
            label='Confirmar Contraseña'
            />
            <ButtonSubmit
            loading={false}
            title='Confirmar'
            />
            </form>
        </div>
    </Dialog.Panel>
    </Transition.Child>
    </div>
    </Dialog>
    </Transition>
    </>
  )
}

export default ResetPasswordDialog;

