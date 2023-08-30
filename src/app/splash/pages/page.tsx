"use client"

import DialogLayout from "@/components/layout/DialogLayout";
import Layout from "@/components/layout/layout"
import SplashPagesList from "@/components/splash/SplashPagesList";
import Loader from "@/components/util/loaders/Loader";
import { getSplashPageList } from "@/context/actions/splashActions";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import slugify from "react-slugify";




const Pages = () =>{
    // const base_url = process.env.PUBLIC_URL
    // const router = useRouter()
    const dispatch = useAppDispatch()
    const splashState = useAppSelector(state=>state.splash)
    // const [ loading,setLoading ] = useState(false)
    // const [splashName,setSplashName] = useState("")
    // const [openCreateDialogSplash, setOpenDialogSplash ] = useState(false)
    
  

    useEffect(()=>{
        dispatch(getSplashPageList())
         // eslint-disable-line react-hooks/exhaustive-deps
    },[])

    return(
      <Layout>
            <SplashPagesList
            splasPagesList={splashState.splashPages}
            />
        </Layout>
    )
}
export default Pages;