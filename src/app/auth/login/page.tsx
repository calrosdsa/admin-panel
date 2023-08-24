"use client"

import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'
import { NextPage, NextPageContext } from 'next'
import 'react-phone-number-input/style.css'
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/context/reduxHooks';
import { login } from '@/context/actions/authActions';
import { ChangeEvent, FormEvent, useState } from 'react';
import { authActions } from '@/context/slices/auth-slice';
import RegistroLayer from '@/components/layout/registerLayer';
import InputPassword from '@/components/util/input/InputPassword';
// import Input from '@/components/util/Input';
import ButtonSubmit from '@/components/util/button/ButtonSubmit';
import Input from '@/components/util/input/Input';

interface Props {
  userAgent?: string;
  language?:string;
}
export default function Home() {
  const dispatch = useAppDispatch()
  const uiState = useAppSelector(state=>state.ui)
  const authtate = useAppSelector(state=>state.auth)
  const [formData,setFormData ] = useState({
    email:"",
    password:""
  })
  // const [showPassword,setShowPassword] = useState(false)
  const {email,password} = formData
  const onChange = (e:ChangeEvent<HTMLInputElement>)=>{
    dispatch(authActions.setErrrorLogin(undefined))
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const onSubmit = (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    dispatch(login(formData.email,formData.password))
  }  

  
  return (
    <>
    <RegistroLayer>
    <div className='sm:w-[400px] bg-gray-50 p-2 py-10 rounded-lg'>
      <div className=' grid place-content-center mb-10'>
      <Image
            src="/images/logo.png"
            height={40}
            width={100}
            priority 
            alt={'teclu-mobility'}/>
       </div>
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
  <div>

  <Input
   label='Email'
   value={email}
   name='email'
   error={authtate.errorLogin?.email}
   onChange={onChange}
   icon={()=>{
    return(
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
      className="w-5 h-5 absolute bottom-[10px] left-[5px] text-gray-400">
   <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
 </svg>
  )}}
  />
  
   <InputPassword
   label='Contraseña'
   password={password}
   name='password'
   onChange={onChange}
   error={authtate.errorLogin?.password}
   className='pt-2'
   />
  </div>
  <ButtonSubmit
  title='Submit'
  loading={uiState.loading}
  />
  {/* <Button disabled={uiState.loading} type="submit">
  {uiState.loading ?
  <Spinner aria-label="Default status example" />
  :
  "Submit"
  }
  </Button> */}
</form>
    </div>
    </RegistroLayer>
    </>
      )
    }
