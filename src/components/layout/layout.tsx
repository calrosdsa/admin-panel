"use client"
import React, { useEffect, useState } from 'react'
import { SideBarApp } from '../sidebar';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify'
import Menu from './Menu';
import { useAppDispatch, useAppSelector } from '@/context/reduxHooks';
import { uiActions } from '@/context/slices/ui-slice';
import { usePathname } from 'next/navigation';

interface Props{
    children:React.ReactNode
}
export default function Layout({ children }:Props) {
    const dispatch = useAppDispatch()
    const pathName = usePathname()
    // const [openSideBar,setOpenSideBar ] = useState(true)
    const uiState = useAppSelector(state=>state.ui)
   
    useEffect(()=>{
      // setOpenSideBar(false)
      dispatch(uiActions.setOpenSidebar(false))
    },[pathName])
   
  return (
    <>
      {/* <Header /> */}
      <ToastContainer/>
      <main className='h-screen flex bg-gray-100  max-w-[1800px] mx-auto shadow-lg '>
        <div className='xl:hidden w-full bg-secondary p-2 fixed top-0 h-10 z-10'>
      <svg onClick={()=>dispatch(uiActions.setOpenSidebar(!uiState.sidebar))}
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
        className="w-6 h-6 text-gray-200 bg-gray-700 absolute right-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
      </svg>

    </div>
    <div className='hidden xl:block'>
        <SideBarApp/>
    </div>
        <Menu
        open={uiState.sidebar}
        setOpen={()=>dispatch(uiActions.setOpenSidebar(false))}
        />
        <div className='h-screen overflow-auto w-full'>
          <div className='mx-auto '>    
        {children}
          </div>
        </div>
        </main>
      {/* <Footer2 /> */}
    </>
  )
}