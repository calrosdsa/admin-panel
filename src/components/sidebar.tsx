
import { getUserData, logout } from "@/context/actions/authActions"
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks"
import { Disclosure } from "@headlessui/react"
import { Sidebar } from "flowbite-react"
import useTranslation from "next-translate/useTranslation"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"


export  const SideBarApp = () =>{
  const { t, lang } = useTranslation('common')
  const router = useRouter()
  const rol = useAppSelector(state=>state.auth.rol)
    // const role = useAppSelector(getRole)
    // const isFuncionario = isFuncionarioRole(role)
    const dispatch = useAppDispatch()
    // const isFuncionarioAdmin = isFuncionarioAdminRole(role)
    // const isAdmin = isAdminRole(role)
useEffect(()=>{
  dispatch(getUserData())
},[])

return(
  <div className="space-y-2 pt-3 relative bg-white w-[200px] h-screen ">
            {/* <Image
            src='/images/teclu-logo.png'
            height={100}
            width={350}
            /> */}
            <div className='w-full flex justify-center pt-2'>
              <Image
            src='/images/logo.png'
            height={30}
            alt='teclu-mobility'
            priority
            width={110}
            />
            </div>
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

      <div onClick={()=>dispatch(logout())} 
                className={`flex pl-2 cursor-pointer absolute xl:bottom-12 bottom-32
                w-full items-center overflow-hidden px-2 hover:bg-gray-200 p-1`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg> 

                    <h3 className='pl-4 font-medium'>Cerrar session</h3>
        </div>
        

        </div>
    )
}


// import { logout } from "@/context/actions/authActions"
// import { useAppDispatch } from "@/context/reduxHooks"
// import { Sidebar } from "flowbite-react"
// import useTranslation from "next-translate/useTranslation"
// import Image from "next/image"
// import Link from "next/link"
// import { useRouter } from "next/router"


// export  const SideBarApp = () =>{
//   const { t, lang } = useTranslation('common')
//   const dispatch = useAppDispatch()
//   const router = useRouter()
//   console.log(router.pathname)

// return(
//     <div className="w-fit relative h-screen">
//     <Sidebar aria-label="Sidebar with logo branding example">
//       <Link href="/dashboard">
//       <Image
//       src="/images/logo.png"
//       alt="logo-teclu"
//       width={110}
//       height={70}
//       priority
//       />
//       </Link>
//       <Sidebar.Items className="mt-3">
//         <Sidebar.ItemGroup>
//           <Sidebar.Item
//             className="cursor-pointer"
//             active={router.pathname == "/dashboard"}
//             onClick={()=>router.push("/dashboard")}
//             icon={()=>{
//               return(
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
//            </svg>
//                 )
//             }}
//           >
//             {t('home')}
//           </Sidebar.Item>
//           <Sidebar.Collapse
//             open
//             icon={()=>{
//               return(
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
//               </svg>
              
//               )
//             }}
//             label={t("users")}
//           >
//             <Sidebar.Item 
//             className="cursor-pointer"
//             active={router.pathname == "/user"}
//             onClick={()=>router.push("/user")}
//             >
//               {t("users-wifi")}
//             </Sidebar.Item>
//             <Sidebar.Item 
//             className="cursor-pointer"
//             active={router.pathname == "/user/solicitudes"}
//             onClick={()=>router.push("/user/solicitudes")}
//             // href="/user/solicitudes"
//             >
//               {t("requests")}
//             </Sidebar.Item>
//           </Sidebar.Collapse>


//           <Sidebar.Collapse
//             open
//             icon={()=>{
//               return(
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
//                 stroke="currentColor" className="w-8 h-8 ">
//      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
//                </svg>
//               )
//             }}
//             label={t("splash-pages")}
//           >
//             <Sidebar.Item 
//             className="cursor-pointer"
//             active={router.pathname == "/splash/pages"}
//             // href={"/splash/pages"}
//             onClick={()=>router.push("/splash/pages")}
//             >
//               {t("portal")}
//             </Sidebar.Item>
//           </Sidebar.Collapse>
          
        
//         </Sidebar.ItemGroup>
//       </Sidebar.Items>

//       <div onClick={()=>dispatch(logout())} 
//               className={`flex pl-2 cursor-pointer absolute xl:bottom-12 bottom-32
//               w-full items-center overflow-hidden px-2 hover:bg-gray-200 p-1`}>
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
//               className="w-7 h-7">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
//           </svg> 

//                   <h3 className='pl-4 font-medium'>Cerrar session</h3>
//       </div>
//       <span className='absolute xl:bottom-3 bottom-28 px-2 text-xs  mx-auto text-center'>Todos los derechos reservados ©2023
//       </span>
//     </Sidebar>
// </div>
//     )
// }