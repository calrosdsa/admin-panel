import React, { ReactNode,useState,useEffect } from 'react'
import Head from 'next/head'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify'
import Image from 'next/image'
type Props = {
    children?: ReactNode
    title?: string
  }

  const SplashLayout = ({
      children,title
    }:Props) =>{
    const [initialAnimation,setInitialAnimation ] = useState(false)
    useEffect(()=>{
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
        <div className='w-full relative h-screen grid lg:grid-cols-2 xl:grid-cols-2 place-items-center max-w-[1800px] mx-auto'>
            <div id="iframe-container" className="w-full bg-white z-10">
        {/* <iframe onChange={(e)=>console.log(e)} className= "w-full h-screen justify-center flex relative"
         src="/transporte2.html"></iframe> */}
         <iframe className= "w-full h-screen flex relative"
         src="http://127.0.0.1:5555/portal.html"
         id="myiframe"></iframe>
      </div>
        {/* <Image
        src='/images/fondo5.jpeg'
        alt="image"
        height={1000}
        width={1000}
        className='w-full h-screen'
        /> */}
        <div
    className={`mt-2 grid grid-cols-1 place-content-center 
     ${initialAnimation?'transition-all translate-x-0 duration-1000 opacity-100':
    "transition-all transform opacity-0"}`}>
          {children}
    </div>
        </div>

    </>
    )
  }

  export default SplashLayout;