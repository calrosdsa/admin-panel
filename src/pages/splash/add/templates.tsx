import CreatePortalLayout from "@/components/layout/CreatePortalLayout";
import ButtonSubmit from "@/components/util/ButtonSubmit";
import ButtonWithLoader from "@/components/util/ButtonWithLoader";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import axios from "axios";
// import { Button, Card, Spinner } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { DeviceFrameset } from "react-device-frameset";
import 'react-device-frameset/styles/marvel-devices.min.css'
import slugify from "react-slugify";

interface TemplateData {
    url:string
    id:number
}
const templates = [
    {
        url:"https://teclu-portal.s3.sa-east-1.amazonaws.com/media/portal-1.png",
        id:1
    },
    {
        url:"https://teclu-portal.s3.sa-east-1.amazonaws.com/media/portal-2.png",
        id:2
    },
    {
        url:"https://teclu-portal.s3.sa-east-1.amazonaws.com/media/portal-3.png",
        id:3
    }
]
const Templates = () =>{
    const [ template,setTemplate ] = useState<TemplateData>()
    const [ loading,setLoading ] = useState(false)
    const router = useRouter()
    const {splash_url,splash_name} = router.query
    const base_url = process.env.PUBLIC_URL
    const dispatch = useAppDispatch()
    const splashState = useAppSelector(state=>state.splash)

      const createPortal = async()=>{
      try{
        setLoading(true)
            const portal =await axios.get(template?.url as string)
            const html = portal.data
            const formData = new FormData()
            formData.append('html',html)
            formData.append('filename',slugify(splash_name))
            const formData2 = new FormData()
            formData2.append("name",slugify(splash_name))
            formData2.append("urlSplash",splash_url+slugify(splash_name))
            const authResponse = await axios.get("/api/auth/token")
            const response = await axios.post(`${base_url}/upload/template/`,formData)
            const response2 =  await axios.post("https://teclu.com/apiFB/public/splashPage/add",formData2,{
              headers:{
                'Authorization':`Bearer ${authResponse.data.access_token}`
              }
            })
            router.push("/splash/pages")
            console.log(response2.data)
            console.log(response.data)
            // window.location.reload()            
            // router.push("/splash/edit")
            // const res =await axios.post(`http://localhost:1323/upload2`,formData)
        }catch(err:any){
          setLoading(false)
          console.log(err)
        }
    }
    return(
        <CreatePortalLayout>
        <div className='p-2 lg:p-16'>
            <div className="title mb-4">Selecciona una plantilla de entre las opciones disponibles</div>
            <div className="grid gap-3 sm:grid-cols-2 px-3">
            {templates.map((item)=>{
                return(
                    <div key={item.id} onClick={()=>setTemplate(item)}
                    className={`shadow-xl grid rounded-xl border-[1px] ${item.id == template?.id && "border-2 border-primary"}`}>

                        <Image
                        className="rounded-xl"
                        src={item.url}
                        alt="image"
                        width={500}
                        height={100}
                        />
                         <div className="flex justify-between p-2">
                     <span>Plantilla 1</span>
                     <a href={item.url} target="_blank">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                     </svg>
                     </a>
                     </div>

                    </div>
                    // <Card imgSrc={item.url} className={`${item.id == template?.id && "border-2 border-primary"}`}
                    // onClick={()=>setTemplate(item)}>
                    // <div className="flex justify-between">
                    // <span>Plantilla 1</span>
                    // <a href={item.url} target="_blank">
                    // <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    //     <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    //     <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    // </svg>
                    // </a>
                    // </div>
                    // </Card>
            )})}
            
            </div>
    </div>
    <div className=" absolute bottom-2 w-full border-t-2 pt-2 flex justify-end z-10 bg-white">
        <ButtonWithLoader
        title="Crear portal"
        loading={loading}
        disabled={template == undefined}
        onClick={createPortal}
        />
        {/* <ButtonSubmit/>
            <Button disabled={template == undefined} onClick={createPortal}
            className="right-3 mx-3">
                {loading ?
                 <Spinner/> 
                 :"Crear portal"}
            </Button> */}
    </div>
    </CreatePortalLayout> 
    )
}

export default Templates;