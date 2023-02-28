import DialogLayout from "@/components/layout/DialogLayout";
import Layout from "@/components/layout/layout"
import SplashPagesList from "@/components/splash/SplashPagesList";
import { getSplashPageList } from "@/context/actions/splashActions";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import axios from "axios";
import { Button, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import slugify from "react-slugify";




const Pages = () =>{
    const base_url = process.env.PUBLIC_URL
    const dispatch = useAppDispatch()
    const splashState = useAppSelector(state=>state.splash)
    const uiState = useAppSelector(state=>state.ui)
    const [ loading,setLoading ] = useState(false)
    const [splashName,setSplashName] = useState("")
    const [openCreateDialogSplash, setOpenDialogSplash ] = useState(false)
    
    const createPortal = async()=>{
      try{
        setLoading(true)
      const portal =await axios.get("https://teclu-portal.s3.sa-east-1.amazonaws.com/portal")
      const html = portal.data
      const formData = new FormData()
      formData.append('html',html)
      formData.append('filename',slugify(splashName))
      const formData2 = new FormData()
      formData2.append("name",slugify(splashName))
      formData2.append("urlSplash",splashState.splashBaseUrl+slugify(splashName))
            const authResponse = await axios.get("/api/auth/token")
            const response = await axios.post(`${base_url}/upload/template/`,formData)
            const response2 =  await axios.post("https://teclu.com/apiFB/public/splashPage/add",formData2,{
              headers:{
                'Authorization':`Bearer ${authResponse.data.access_token}`
              }
            })
            console.log(response2.data)
            console.log(response.data)
            window.location.reload()            
            // router.push("/splash/edit")
            // const res =await axios.post(`http://localhost:1323/upload2`,formData)
        }catch(err:any){
          setLoading(false)
          console.log(err)
        }
    }

    useEffect(()=>{
        dispatch(getSplashPageList())
         // eslint-disable-line react-hooks/exhaustive-deps
    },[])

    return(
      <Layout>
          {openCreateDialogSplash &&
          <DialogLayout
          title="Create splash"
          open={openCreateDialogSplash}
          closeDialog={()=>setOpenDialogSplash(false)}
          >
              <div>
                <code className="text-sm">{splashState.splashBaseUrl+slugify(splashName)}</code>
            <TextInput
              id="urlsplashName"
              className="m-2"
              type="text"
              value={splashName}
              onChange={(e)=>{
                setSplashName(e.target.value)
              }}
              required={true}
            />
            <Button disabled={loading}
            onClick={createPortal}>
              {loading?
              <div className=" space-x-3">
                <span>Crear splash page</span>
                <Spinner/>
              </div>
              :
              "Crear splash page"
              }
            </Button>
            </div>
          </DialogLayout>
          }
            <div className="">
              <div className="mb-3">
                <Button color={'light'} onClick={()=>setOpenDialogSplash(true)}>
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