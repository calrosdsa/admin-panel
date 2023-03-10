import DialogLayout from "@/components/layout/DialogLayout";
import Layout from "@/components/layout/layout"
import SplashPagesList from "@/components/splash/SplashPagesList";
import { getSplashPageList } from "@/context/actions/splashActions";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import axios from "axios";
import { Button, Spinner, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import slugify from "react-slugify";




const Pages = () =>{
    // const base_url = process.env.PUBLIC_URL
    const router = useRouter()
    const dispatch = useAppDispatch()
    const splashState = useAppSelector(state=>state.splash)
    const uiState = useAppSelector(state=>state.ui)
    // const [ loading,setLoading ] = useState(false)
    // const [splashName,setSplashName] = useState("")
    // const [openCreateDialogSplash, setOpenDialogSplash ] = useState(false)
    
  

    useEffect(()=>{
        dispatch(getSplashPageList())
         // eslint-disable-line react-hooks/exhaustive-deps
    },[])

    return(
      <Layout>
      
            <div className="">
              <div className="mb-3">
                <Button color={'light'} onClick={()=>router.push(`/splash/add?splash_url=${splashState.splashBaseUrl}`)}>
                Crear
                </Button>
              </div>
              {uiState.innerLoading ?
               <div className='grid place-content-center w-full h-[50vh]'>
               <FallingLines
               color="#0406ee"
               width="110"
               visible={true}
               // ariaLabel='falling-lines-loading'
               />
               </div>
               :
            <SplashPagesList
            splasPagesList={splashState.splashPages}
            />
          }
            </div>
        </Layout>
    )
}
export default Pages;