import React, { ReactNode,useState,useEffect } from 'react'
import Head from 'next/head'
import Menu from './Menu'
import { useAppDispatch, useAppSelector } from '../context/reduxHooks'
import { uiActions } from '../context/slices/ui-slice'
import Sidenav from './menu/Sidenav'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify'


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
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      <link rel="stylesheet" href="http://localhost:1323/view/portal.css"/>
      {/* <link rel="stylesheet" href="https://teclu-portal.s3.sa-east-1.amazonaws.com/css/portal.css"/> */}
    </Head>
    <ToastContainer
    />
  <div className={`flex  relative  min-w-[1200px] max-w-[1800px] mx-auto bg-gray`}>
      {/* <Menu open={open} setOpen={setOpen}/>  */}
      <Sidenav/>
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
