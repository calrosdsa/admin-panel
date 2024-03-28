"use client"
import React, { ReactNode,useState,useEffect } from 'react'
import Head from 'next/head'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify'
import Image from 'next/image'
// import { useAppDispatch } from '@/context/reduxHooks';
// import { getUserData } from '@/context/actions/authActions';
// import { useRouter } from 'next/router';
// import { getCookie } from 'cookies-next';
type Props = {
    children?: ReactNode
    title?: string
  }

  const  RegistroLayer = ({
      children,title
    }:Props) =>{
    const [initialAnimation,setInitialAnimation ] = useState(false)
    // const dispatch = useAppDispatch()
    // const router = useRouter()
    // const {redirect} = router.query
    useEffect(()=>{
        // dispatch(getUserData())
        // if(typeof window != 'undefined'){
        //   const isAuth = getCookie("_auth")
        //   if(isAuth){
        //     if(redirect != undefined){
        //       window.location.replace(redirect as string)
        //     }else{
        //       window.location.replace(window.location.origin)
        //     }
        //   }
        // }
        // if(redirect != undefined){

        // }
        setInitialAnimation(true)
},[])

return(
    <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <ToastContainer
    />
        <div className='w-full relative h-screen grid xl:grid-cols-2 border-2 place-content-center place-items-center'>
        <Image
        src='/images/fondo5.jpeg'
        alt="image"
        height={1000}
        width={1000}
        className='w-full hidden xl:block h-screen'
        />
        <div className='relative'>
        <div
    className={`
     ${initialAnimation?'transition-all translate-x-0 duration-1000 opacity-100':
    "transition-all transform opacity-0"}`}>
          {children}
      <a href='https://teclu.com' target='_blank' className='absolute bottom-0 left-1/2 -translate-x-1/2 text-primary underline'>By Teclu</a>
    </div>
    </div>
        </div>

    </>
    )
  }

  export default RegistroLayer