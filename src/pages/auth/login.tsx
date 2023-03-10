import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'
import { NextPage, NextPageContext } from 'next'
import 'react-phone-number-input/style.css'
import { Button, Label, Spinner, TextInput } from 'flowbite-react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/context/reduxHooks';
import { login } from '@/context/actions/authActions';
import { ChangeEvent, FormEvent, useState } from 'react';
import { authActions } from '@/context/slices/auth-slice';
import RegistroLayer from '@/components/layout/registerLayer';

interface Props {
  userAgent?: string;
  language?:string;
}
const Home:NextPage<Props>=({userAgent,language}) => {
  const dispatch = useAppDispatch()
  const uiState = useAppSelector(state=>state.ui)
  const authtate = useAppSelector(state=>state.auth)
  const [formData,setFormData ] = useState({
    email:"",
    password:""
  })
  const [showPassword,setShowPassword] = useState(false)
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
    <div className='max-w-md bg-gray-50 p-2 py-10 rounded-lg'>
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
    <div className="mb-2 block">
      <Label
        htmlFor="email1"
        value="Your email"
      />
    </div>
    <TextInput
    onChange={onChange}
      id="email1"
      type="email"
      name='email'
      value={email}
      placeholder="name@flowbite.com"
      helperText={<span className='text-red-600'>{authtate.errorLogin?.email}</span>}
      icon={()=>{
        return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
        className="w-5 h-5 opacity-50">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
</svg>
      }}
      required={true}
      />
  </div>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="password1"
        value="Your password"
        />
    </div>
    <div className='relative'>
    <TextInput
      id="password1"
      onChange={onChange}
      value={password}
      name="password"
      type={showPassword ? "text":"password"}
      className='w-full'
      maxLength={20}
      required={true}
      helperText={<span className='text-red-600'>{authtate.errorLogin?.password}</span>}
      icon={()=>{
        return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
        className="w-5 h-5 opacity-50">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
      }}  
      />
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
        onClick={()=>setShowPassword(!showPassword)}
        stroke="currentColor" className="w-5 h-5 opacity-50 cursor-pointer absolute right-2 top-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
  </div>
  <Button disabled={uiState.loading} type="submit">
  {uiState.loading ?
  <Spinner aria-label="Default status example" />
  :
  "Submit"
  }
  </Button>
</form>
    </div>
    </RegistroLayer>
    </>
      )
    }
    Home.getInitialProps = async ({ req,res,pathname,query }) => {
      const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
      const lang =req ? req.headers["accept-language"]: navigator.language; 
      const lastIndex = lang?.lastIndexOf(',') || 4
      const language =  lang?.substring(1+lastIndex)
      return { userAgent,language }
      
}

export default Home;