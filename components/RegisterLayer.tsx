import React, { ReactNode,useState,useEffect } from 'react'
import Head from 'next/head'

type Props = {
    children?: ReactNode
    title?: string
  }

  const  RegistroLayer = ({
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
        <div className='w-full relative h-screen grid xl:grid-cols-2 place-items-center'>
        <img
        src='/images/fondo5.jpeg'
        alt="image"
        className='w-full h-screen hidden xl:block'
        />
        <div
    className={`mt-2 w-[100%] sm:w-[60%] xl:w-2/3 2xl:w-[55%] grid grid-cols-1 place-content-center
     ${initialAnimation?'transition-all translate-x-0 duration-1000 opacity-100':
    "transition-all transform opacity-0"}`}>
          {children}
    </div>
        </div>

    </>
    )
  }

  export default RegistroLayer