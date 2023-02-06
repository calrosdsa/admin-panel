import Link from 'next/link'
import { Disclosure,Transition } from '@headlessui/react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../context/reduxHooks';
import { logout } from '../../context/actions/authActions';
const SideNavContent = ()=>{
  const dispatch = useAppDispatch()
  const uiState = useAppSelector(state=>state.ui)
  const authState = useAppSelector(state=>state.auth)
    const router = useRouter()
    return(
      <>
        <div className="space-y-2 pt-3 relative h-screen">
            {/* <Image
            src='/images/teclu-logo.png'
            height={100}
            width={350}
            /> */}
            <div className='w-full px-2 flex justify-center'>
              <Image
            src='/images/logo_teclu_mobility.png'
            height={90}
            width={120} alt={''}            />
            </div>
            <div className='pt-4'/>
            <div onClick={()=>router.push('/dashboard')} 
            className={`flex cursor-pointer items-center overflow-hidden relative px-2 hover:bg-gray-200 p-1
            ${uiState.pathName == "/dashboard" && "text-primary bg-gray-200"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
              stroke="currentColor" className={`w-8 h-8`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
                <h3 className='pl-4 font-medium'>Inicio</h3>
            </div>

            <div onClick={()=>dispatch(logout())} 
            className={`flex pl-2 cursor-pointer absolute bottom-5  w-full items-center overflow-hidden px-2 hover:bg-gray-200 p-1`}>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
            className="w-7 h-7">
   <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
         </svg> 

                <h3 className='pl-4 font-medium'>Cerrar session</h3>
            </div>
          {authState.rol != '1' &&  
          <>
            <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex px-2 items-center justify-between w-full
              font-medium hover:bg-gray-200 p-1 focus:outline-none 
              focus-visible:ring focus-visible:ring-opacity-75">
             <div  className='cursor-pointer flex justify-center items-center overflow-hidden'>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
             stroke="currentColor" className="w-7 h-7">
   <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121
   -.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0
   18.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 
   0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
           </svg>
                <h3 className='pl-4'>Users</h3>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className={`w-6 h-6  ${open ? 'rotate-180 transform' : ''}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
           </svg>
              </Disclosure.Button>
              <Disclosure.Panel className="pl-7 text-sm text-gray-500">
              <div onClick={()=>router.push('/users/usuarios')} 
              className='flex cursor-pointer items-center hover:bg-gray-200 p-1 rounded-lg'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-6 h-6">
       <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
                <h3 className='pl-4'>Usuarios</h3>
            </div>

            <div onClick={()=>router.push('/user/solicitudes')} 
              className={`flex cursor-pointer items-center hover:bg-gray-200 p-1 rounded-lg
              ${uiState.pathName == "/user/solicitudes" && "text-primary bg-gray-200"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
           </svg>
                <h3 className='pl-4'>Solicitudes</h3>

            </div>

              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

            <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex px-2 items-center justify-between w-full
              font-medium hover:bg-gray-200 p-1 focus:outline-none 
              focus-visible:ring focus-visible:ring-opacity-75">
             <div  className='cursor-pointer flex justify-center items-center overflow-hidden'>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-8 h-8 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
            </svg>
                <h3 className='pl-4'>Splash Pages</h3>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className={`w-6 h-6  ${open ? 'rotate-180 transform' : ''}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
           </svg>
              </Disclosure.Button>
              <Disclosure.Panel className="pl-7 text-sm text-gray-500">
              <div onClick={()=>router.push('/splash-pages')} 
              className={`flex cursor-pointer items-center hover:bg-gray-200 p-1 rounded-lg
              ${uiState.pathName == "/splash-pages" && "text-primary bg-gray-200"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-8 h-8 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
</svg>
                <h3 className='pl-4'>Portales</h3>
            </div>
           
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
       </>
       }


            {/* <Disclosure defaultOpen>
            {({ open }) => (
              <>
              <Disclosure.Button className="flex px-2 items-center justify-between w-full
              font-medium hover:bg-gray-200 p-1 focus:outline-none 
              focus-visible:ring focus-visible:ring-opacity-75">
              <div  className='cursor-pointer flex justify-center items-center overflow-hidden'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
              stroke="currentColor" className="w-8 h-8 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <h3 className='pl-4'>Account</h3>
              </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className={`w-6 h-6  ${open ? 'rotate-180 transform' : ''}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
           </svg>
           </Disclosure.Button>
           
           <Disclosure.Panel className="pl-7 text-sm text-gray-500">
           <div onClick={()=>router.push('/account/areas')} 
           className='flex cursor-pointer items-center hover:bg-gray-200 px-2 rounded-lg'>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-8 h-8 ">
             <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
             </svg>
             <h3 className='pl-4'>Areas</h3>
             </div>
             <div onClick={()=>router.push('/casos')} className='flex cursor-pointer items-center
             hover:bg-gray-200 px-2 rounded-lg'>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-8 h-8 ">
             <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
             </svg>
             
             <h3 className='pl-4'>Perfil</h3>
             </div>
             <div onClick={()=>router.push('/empresa')} className='flex cursor-pointer items-center
             hover:bg-gray-200 px-2 rounded-lg'>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-8 h-8 ">
             <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
             </svg>

             <h3 className='pl-4'>Empresa</h3>
             </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        
        <div onClick={()=>router.push('/dashboard')} 
            className='flex cursor-pointer items-center overflow-hidden relative px-2 hover:bg-gray-200 p-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
            stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
                <h3 className='pl-4 font-medium'>Dashboard</h3>
            </div>
            
            <div onClick={()=>router.push('/dashboard')} 
            className='flex cursor-pointer items-center overflow-hidden relative px-2 hover:bg-gray-200 p-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
            stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
                <h3 className='pl-4 font-medium'>Dashboard</h3>
            </div>
            
            <div onClick={()=>router.push('/dashboard')} 
            className='flex cursor-pointer items-center overflow-hidden relative px-2 hover:bg-gray-200 p-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
            stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
                <h3 className='pl-4 font-medium'>Dashboard</h3>
            </div>

            <div onClick={()=>router.push('/dashboard')} 
            className='flex cursor-pointer items-center overflow-hidden relative px-2 hover:bg-gray-200 p-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
            stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        <h3 className='pl-4 font-medium'>Dashboard</h3>
      </div> */}

        </div>
      </>

    )
}

export default SideNavContent;