
import { useThemeMode } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { SideBarApp } from '../sidebar';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify'
import Menu from './Menu';

interface Props{
    children:React.ReactNode
}
export default function Layout({ children }:Props) {
    const [mode, setMode, toggleMode] = useThemeMode(true); // -> ["light", ..]
    const [openSideBar,setOpenSideBar ] = useState(true)
    const closeSideBar = (bool:boolean)=>{
      
      console.log(bool)
      if(!bool){
        setOpenSideBar(false)
      }else{
        setOpenSideBar(true)
      }
      // if(openSideBar) {
      //   console.log(openSideBar)
      //   setOpenSideBar(false)}
        
      //    else{ 
      //   console.log(openSideBar)
      //     setOpenSideBar(true)
      //    }
    }
    useEffect(()=>{
        console.log(mode)
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // dark mode
            console.log("isDarkMode")
            setMode("light")
            // setMode("dark")
        }
    },[mode])
  return (
    <>
      {/* <Header /> */}
      <ToastContainer/>
      <main className='h-screen flex bg-gray-100 dark:bg-gray-900 max-w-[1800px] '>
        <div className='xl:hidden w-full bg-secondary p-2 fixed top-0 z-10'>
      <svg onClick={()=>setOpenSideBar(!openSideBar)}
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
        className="w-7 h-7 text-gray-200 bg-gray-700 relative">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
      </svg>

    </div>
    <div className='hidden xl:block'>
        <SideBarApp/>
    </div>
        <Menu
        open={openSideBar}
        setOpen={()=>setOpenSideBar(false)}
        />
        <div className='h-screen overflow-auto w-full'>
          <div className='mx-auto px-2 xl:px-10 '>    
        {children}
          </div>
        </div>
        </main>
      {/* <Footer2 /> */}
    </>
  )
}