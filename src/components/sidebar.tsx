
import { getUserData, logout } from "@/context/actions/authActions"
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks"
import { Disclosure } from "@headlessui/react"
import useTranslation from "next-translate/useTranslation"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ResetPasswordDialog from "./dialog/account/ResetPasswordDialog"
import { getCookie } from "cookies-next"


export  const SideBarApp = () =>{
  const { t, lang } = useTranslation('common')
  const router = useRouter()
  // const rol = getCookie("rol")
  const rol = useAppSelector(state=>state.auth.rol)
  const [openDialogReset,setOpenDialogReset ] = useState(false)
    // const role = useAppSelector(getRole)
    // const isFuncionario = isFuncionarioRole(role)
    const dispatch = useAppDispatch()
    // const isFuncionarioAdmin = isFuncionarioAdminRole(role)
    // const isAdmin = isAdminRole(role)
useEffect(()=>{
  dispatch(getUserData())
  // console.log(rol)
},[])

return(
  <>
  {openDialogReset&&
  <ResetPasswordDialog
  openModal={openDialogReset}
  closeModal={()=>setOpenDialogReset(false)}
  />
  }
  <div className="space-y-2 pt-3 relative bg-white w-[200px] h-screen pb-2">
            <div className='w-full flex justify-center '>
              <Image
            src='/images/logo.png'
            height={30}
            alt='teclu-mobility'
            priority
            width={110}
            />
            </div>
  {rol != undefined&&
  <>
            {/* <Image
            src='/images/teclu-logo.png'
            height={100}
            width={350}
            /> */}
            <div className='pt-2'/>
            <div onClick={()=>router.push('/dashboard')} 
            className={`flex cursor-pointer px-2 items-center hover:bg-gray-200 p-1
            ${router.pathname == '/dashboard' && "bg-gray-200"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
            stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
                <h3 className='pl-4 font-medium'>  {t('home')}</h3>
            </div>

        {rol == "0" &&
        <>
             <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex px-2 items-center justify-between w-full
              font-medium hover:bg-gray-200 p-1 focus:outline-none 
              focus-visible:ring focus-visible:ring-opacity-75">
             <div  className='cursor-pointer flex justify-center items-center overflow-hidden'>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
             stroke="currentColor" className="w-6 h-6">
   <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121
   -.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0
   18.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 
   0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
           </svg>
                <span className='pl-4'>{t("users")}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className={`w-6 h-6  ${open ? 'rotate-180 transform' : ''}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
           </svg>
              </Disclosure.Button>
              <Disclosure.Panel className="pl-7 text-sm text-gray-500">
              <div onClick={()=>router.push('/user')} 
              className={`flex cursor-pointer items-center hover:bg-gray-200 p-2
              ${router.pathname == '/user' && "bg-gray-200"}`}>
                <h3 className='pl-4'>  {t("users-wifi")}</h3>
            </div>
            <div onClick={()=>router.push('/user/solicitudes')} 
            className={`flex cursor-pointer items-center hover:bg-gray-200 p-2
              ${router.pathname == '/user/solicitudes' && "bg-gray-200"}`}>
                
              <h3 className='pl-4'> {t("requests")}</h3>
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
             stroke="currentColor" className="w-6 h-6">
   <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121
   -.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0
   18.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 
   0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
           </svg>
                <span className='pl-4'>{t("splash-pages")}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className={`w-6 h-6  ${open ? 'rotate-180 transform' : ''}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
           </svg>
              </Disclosure.Button>
              <Disclosure.Panel className="pl-7 text-sm text-gray-500">
              <div onClick={()=>router.push('/splash/pages')} 
              className={`flex cursor-pointer items-center hover:bg-gray-200 p-2
              ${router.pathname == '/splash/pages' && "bg-gray-200"}`}>
                <h3 className='pl-4'> {t("portal")}</h3>
            </div>
           
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        </>
        }

</>
}        
     <div className=" absolute xl:bottom-12 bottom-32
                w-full items-center">

      <div onClick={()=>setOpenDialogReset(true)} 
                className={`flex pl-2 cursor-pointer items-center overflow-hidden px-2 hover:bg-gray-200 p-2`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
</svg>


                    <h3 className='pl-4 text-sm font-medium truncate'>Cambiar contraseña</h3>
        </div>
        

          <div onClick={()=>dispatch(logout())} 
                className={`flex pl-2 items-center cursor-pointer overflow-hidden px-2 hover:bg-gray-200 p-2`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg> 

                    <h3 className='pl-4 font-medium text-sm'>Cerrar session</h3>
        </div>
        </div>
      </div>
      </>
    )
}


