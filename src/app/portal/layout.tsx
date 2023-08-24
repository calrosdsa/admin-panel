"use client"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify'
import Image from "next/image"
import { useState } from "react";
import { SideBarApp } from "@/components/sidebar";
import Menu from "@/components/layout/Menu";

export default function PortalLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    const [openSideBar,setOpenSideBar ] = useState(true)
    return (
     <>
     <ToastContainer/>
      <main className='h-screen flex bg-gray-100  max-w-[1800px] mx-auto shadow-lg '>
        <div className='xl:hidden w-full bg-secondary p-2 fixed top-0 h-10 z-10'>
      <svg onClick={()=>setOpenSideBar(!openSideBar)}
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
        className="w-6 h-6 text-gray-200 bg-gray-700 absolute right-2">
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
          <div className='mx-auto px-2 xl:px-2 '>    
        {children}
          </div>
        </div>
        </main>
     </>
    )
  }