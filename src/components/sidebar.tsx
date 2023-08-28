
import { getUserData, logout } from "@/context/actions/authActions"
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks"
import { Disclosure } from "@headlessui/react"
import useTranslation from "next-translate/useTranslation"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ResetPasswordDialog from "./dialog/account/ResetPasswordDialog"
import { getCookie } from "cookies-next"
import { getUser } from "@/context/selectors"
import { clientEncuesta, facebookClients } from "@/utils/data/clients"
import { uiActions } from "@/context/slices/ui-slice"


export  const SideBarApp = () =>{
  const { t, lang } = useTranslation('common')
  const router = useRouter()
  const pathname = usePathname()
  // const rol = getCookie("rol")
  const rol = useAppSelector(state=>state.auth.rol)
  const user = useAppSelector(getUser)
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
  <div className="space-y-2 pt-3 relative bg-white w-[220px] h-screen pb-2">
    <div className="px-2 py-1 flex items-center space-x-3 h-12 border-b-[1px] hover:bg-gray-200 cursor-pointer">
      <img src="/images/user-icon-placeholder.webp" alt="" className="rounded-full h-7 w-7"/>
      <div className="grid">
      <span className="text-sm font-medium truncate">{user?.fullName}</span>
      <span className="text-xs truncate">{user?.email}</span>
      </div>
    </div>
    
    <div onClick={()=>{
      // dispatch(uiActions.setOpenSidebar(false))
      setOpenDialogReset(true)
    }}
                className={`flex smallButton w-10/12  cursor-pointer justify-center mx-auto hover:bg-gray-200 space-x-2`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
              className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
</svg>
      <h3 className='text-sm truncate'>Cambiar contraseña</h3>
    </div>
        
        <div onClick={()=>dispatch(logout())} 
                className={`flex smallButton w-10/12  cursor-pointer justify-center mx-auto hover:bg-gray-200 space-x-2`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg> 

                    <h3 className='text-sm'>Cerrar session</h3>
        </div>

        
            {/* <div className='w-full flex justify-center '>
              <Image
            src='/images/logo.png'
            height={30}
            alt='teclu-mobility'
            priority
            width={110}
            />
            </div> */}
  {rol != undefined&&
  <>
            {/* <Image
            src='/images/teclu-logo.png'
            height={100}
            width={350}
            /> */}
            <div className='pt-1'/>
            {/* <div onClick={()=>router.push('/dashboard')} 
            className={`flex cursor-pointer px-2 items-center hover:bg-gray-200 p-1
            ${pathname == '/dashboard' && "bg-gray-200"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
            stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
                <h3 className='pl-4 font-medium'>  {t('home')}</h3>
            </div> */}

        {/* {rol == "0" && */}
        <>
             <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex px-2 items-center justify-between w-full
              font-medium hover:bg-gray-200 p-1 focus:outline-none 
              focus-visible:ring focus-visible:ring-opacity-75">
             <div  className='cursor-pointer flex justify-center items-center overflow-hidden'>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
              </svg>

                <span className='pl-4'>Reportes</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className={`w-6 h-6  ${open ? 'rotate-180 transform' : ''}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
           </svg>
              </Disclosure.Button>
              <Disclosure.Panel className="pl-7 text-sm text-gray-500">
              <div onClick={()=>router.push('/user')} 
              className={`flex cursor-pointer items-center hover:bg-gray-200 p-2
              ${pathname == '/user' && "bg-gray-200"}`}>
                <h3 className='pl-4'> Conexiones</h3>
            </div>
          {(user != undefined && clientEncuesta.includes(user?.idClient)) &&
          <div onClick={()=>router.push('/reportes/encuesta')} 
            className={`flex cursor-pointer items-center hover:bg-gray-200 p-2
              ${pathname == '/reportes/encuesta' && "bg-gray-200"}`}>
                
              <h3 className='pl-4'>Encuestas</h3>
          </div>
          }
          {(user != undefined && facebookClients.includes(user?.idClient)) &&
            <div onClick={()=>router.push('/reportes/facebook-data')} 
            className={`flex cursor-pointer items-center hover:bg-gray-200 p-2
            ${pathname == '/reportes/facebook-data' && "bg-gray-200"}`}>
                
              <h3 className='pl-4'>Facebook</h3>
          </div>
              }
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
                <span className='pl-4'>Gestionar</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className={`w-6 h-6  ${open ? 'rotate-180 transform' : ''}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
           </svg>
              </Disclosure.Button>
              <Disclosure.Panel className="pl-7 text-sm text-gray-500">
              <div onClick={()=>router.push('/manage/users')} 
              className={`flex cursor-pointer items-center hover:bg-gray-200 p-2
              ${pathname == '/manage/users' && "bg-gray-200"}`}>
                <h3 className='pl-4'>Usuarios</h3>
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
             {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
             stroke="currentColor" className="w-6 h-6">
   <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121
   -.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0
   18.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 
   0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
           </svg> */}
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
            className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
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
              ${pathname == '/splash/pages' && "bg-gray-200"}`}>
                <h3 className='pl-4'>Portales</h3>
            </div>
           
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        </>
        {/* } */}

</>
}        

      </div>
      </>
    )
}
