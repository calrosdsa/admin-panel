

import React,{FormEvent, Fragment, useState} from 'react'
import { Dialog,Transition } from '@headlessui/react'
import InputPassword from '@/components/util/input/InputPassword'
import ButtonSubmit from '@/components/util/button/ButtonSubmit'
import { resetPassword } from '@/context/actions/authActions'
import { useAppDispatch, useAppSelector } from '@/context/reduxHooks'
import DialogConfirmation from '@/components/dialog/DialogConfirmation'
import DialogHeader from '@/components/dialog/DialogHeader'
import Input from '@/components/util/input/Input'
import { UserRol } from '@/data/models/type/user-models'
import { getUserBussinessList } from '@/context/actions/userActions'
import { toast } from 'react-toastify'

 interface Props{
   openModal:boolean,
   closeModal:()=>void,
 }


const CreateUserNegocioDialog:React.FC<Props>=({
  openModal,closeModal,
})=> {
    // const [openDialogConfirm,setOpenDialogConfirm] = useState(false)
    const dispatch = useAppDispatch()
    const [loading,setLaoding] = useState(false)
    // const loading = useAppSelector(state=>state.ui.loading)
    const [formData,setFormData]=useState({
        fullName:"",
        email:"",
        idRol:UserRol.REPORTE.toString()
    })
    const {fullName,email,idRol} = formData
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const onSubmit = async(e:FormEvent<HTMLFormElement>)=>{
    try{

      setLaoding(true)
      e.preventDefault()
      console.log(formData,"SUBMITTED DATA")
      const res = await fetch("/api/user/bussiness/add",{
      method:"POST",
      body:JSON.stringify(formData)
    })
    let data; 
    // console.log("status--",res.status)
    switch(res.status){
      case 200:
        data = await res.json()
        toast.success("Se ha agregado un nuevo usuario")
        dispatch(getUserBussinessList())
        setLaoding(false)
        closeModal()
        break
      case 400:
        data = await res.json()
        console.log("error 400",data)
        setLaoding(false)
        closeModal()
        toast.error(JSON.stringify(data))
        break
      case 500:
        console.log("default 500")
        setLaoding(false) 
        closeModal()
        toast.error("Ocurrio un error inesperado")
        break
      }
    }catch(err){
      console.log(err)
      
      setLaoding(false)
    }
  }

  return (
    <>
    <Transition appear show={openModal} as={Fragment}>
    <Dialog as='div' className="relative z-20" open={openModal} onClose={() =>{
        closeModal()
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
            title='Crear usuario'
            close={()=>closeModal()}
            />
            <form onSubmit={onSubmit}>
                <Input
                value={fullName}
                onChange={onChange}
                name='fullName'
                label='Nombre'
                icon={()=>{
                    return(
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                         className="w-5 h-5 absolute bottom-[10px] left-[5px] text-gray-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
                </svg>
                    )
                }}
                />
                <Input
                value={email}
                onChange={onChange}
                name='email'
                label='Email'
                type='email'
                icon={()=>{
                    return(
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="w-5 h-5 absolute bottom-[10px] left-[5px] text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>                      
                    )
                }}
                />

                <div className='mt-3'>
                <label htmlFor="idRol" className="labelText">User rol</label>
                <select name="idRol" id="idRol" className='input'
                value={idRol} onChange={(e)=>{
                  setFormData({
                    ...formData,
                    idRol:e.target.value
                  })
                }}>
                  <option value={UserRol.ADMIN.toString()}>User admin Rol</option>
                  <option value={UserRol.REPORTE.toString()}>User reporte Rol</option>
                </select>
                </div>
                 
                <ButtonSubmit
                loading={loading}
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

export default CreateUserNegocioDialog;

