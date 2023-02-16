import React, { ReactNode,useState,useEffect, Suspense } from 'react'
import Head from 'next/head'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../context/reduxHooks';
import { uiActions } from '../../context/slices/ui-slice';
import Sidenav from '../menu/Sidenav';
import { FallingLines } from 'react-loader-spinner';
import { getUserData } from '../../context/actions/authActions';
import Menu from '../Menu';


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
  const authState = useAppSelector(state=>state.auth)
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
  useEffect(()=>{
    dispatch(getUserData())
    if(typeof window != 'undefined'){
      dispatch(uiActions.setPathName(window.location.pathname))
    }
  },[])


  return(
    <>
    <Head>
      <title>{title}</title>
      {/* <link rel="stylesheet" href="https://teclu-portal.s3.sa-east-1.amazonaws.com/css/portal.css"/> */}
    </Head>
    <ToastContainer
    />
    {authState.rol != undefined &&
  <div className={`xl:flex  relative  max-w-[1800px] mx-auto bg-gray`}>
    <nav className='xl:hidden w-full bg-secondary p-2 fixed top-0 z-10'>
    <svg onClick={()=>setOpen(true)}
     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
     className="w-7 h-7 text-gray-200">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
</svg>

    </nav>
      {/* <Menu open={open} setOpen={setOpen}/>  */}
      <Sidenav/>
      <Menu
      open={open}
      setOpen={setOpen}
      />
    {/* {isDashboard && 
       isBigScreen||
       <Menu open={open} setOpen={setOpen}/> 
      } */}
      {uiState.loading ?
      <div className='grid place-content-center w-full h-screen'>
      <FallingLines
      color="#0406ee"
      width="110"
      visible={true}
      // ariaLabel='falling-lines-loading'
      />
      </div>
      :
      <>
      <div  className={`px-1 pt-14 xl:pt-0 w-full mx-auto bg-gray-100   xl:overflow-auto h-screen
      `}>
        {/* ${uiState.initAnimation ? " opacity-0 transform transition-all duration-500":
        " opacity-100 transform transition-all duration-500"} */}
    {children}
      </div>
        </>
        }
  </div>
    }
  </>
  )
}

export default Layout
