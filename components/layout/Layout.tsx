import React, { ReactNode,useState,useEffect, Suspense } from 'react'
import Head from 'next/head'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../context/reduxHooks';
import { uiActions } from '../../context/slices/ui-slice';
import Sidenav from '../menu/Sidenav';
import { FallingLines } from 'react-loader-spinner';


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

//   useEffect(()=>{
//     if(!uiState.loading){
//       dispatch(uiActions.setInitAnimation(true))
//       setTimeout(()=>{
//         dispatch(uiActions.setInitAnimation(false))
//       },200)
//     }
// },[uiState.loading])
  


  return(
    <>
    <Head>
      <title>{title}</title>
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
      {uiState.loading ?
      <div className='grid place-content-center w-full'>
      <FallingLines
      color="#0406ee"
      width="110"
      visible={true}
      // ariaLabel='falling-lines-loading'
      />
      </div>
      :
      <div  className={`px-1  sm:px-4  relative w-full mx-auto bg-gray-100 overflow-auto h-screen
      `}>
        {/* ${uiState.initAnimation ? " opacity-0 transform transition-all duration-500":
        " opacity-100 transform transition-all duration-500"} */}
    {children}
      </div>
        }
  </div>
  </>
  )
}

export default Layout
