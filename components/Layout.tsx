import React, { ReactNode,useState,useEffect } from 'react'
import Head from 'next/head'
import Menu from './Menu'
import { useAppDispatch, useAppSelector } from '../context/reduxHooks'
import { uiActions } from '../context/slices/ui-slice'


type Props = {
  children?: ReactNode
  title?: string
  isDashboard?:boolean
}

const Layout = ({ children, title = 'This is the default title',isDashboard = true }: Props) => {
  const dispatch = useAppDispatch()
  const [open,setOpen] = useState(false)
  const [closeMenu,setCloseMenu] = useState(false)
  const uiState=useAppSelector(state=>state.ui);
  // const setLogin = (bool:boolean) => dispatch(uiActions.setLoginDialog(bool))
  const [showSideBar,setShowSideBar] = useState(true)
  // const [showProfile,setShowProfile] = useState(false)
  const openMenu = ()=>{
    if(closeMenu){
      setCloseMenu(false)
      setOpen(false)
    } else {
      setCloseMenu(true)
      setOpen(true)
    }
  }
  
  useEffect(()=>{
    // dispatch(uiActions.setInitAnimation(true))
   
  //   setTimeout(()=>{
  //     dispatch(uiActions.setInitAnimation(false))
  // },200)
  },[])


  return(
    <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
 
    <header className={`bg-gray-800 fixed top-0 max-w-[1900px] inset-0
     mx-auto z-10  h-14 px-3 lg:px-6 xl:px-8 2xl:px-14`}>
      <div className='grid grid-cols-2 py-[13px]'>
      <div className='' onClick={()=>openMenu()}>
        {/* MENU */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
       strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 sm:w-8 sm:h-8 text-gray-100">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
     </svg>
     </div>

    {/* <AccountButton 
    setLogin={setLogin}
    session={session}
    /> */}

      </div>
    </header>
  <div className={`flex  relative  max-w-[1900px] mx-auto bg-gray-100`}>
      <Menu open={open} setOpen={setOpen}/> 
    {/* {isDashboard && 
       isBigScreen||
        <Menu open={open} setOpen={setOpen}/> 
    } */}
    {children}
  </div>
  
  </>
  )
}

export default Layout
