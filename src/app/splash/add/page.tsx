"use client"

import CreatePortalLayout from "@/components/layout/CreatePortalLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import slugify from "react-slugify";


const AddSplashPage = () =>{
    const router = useRouter()
    const params = useSearchParams()
    const splash_url = params.get("splash_url")
    const [splashName,setSplashName] = useState<string>("")



    return(
        <CreatePortalLayout>
               <div className="p-2 lg:px-4 flex justify-center items-center h-full flex-col w-full">
                <div className="w-11/12 sm:w-2/3 grid">
                <code className="text-sm">{splash_url+slugify(splashName)}</code>
            <input
              // id="urlsplashName"
              className="m-2 input"
              type="text"
              value={splashName}
              onKeyDown={(e)=>{
                if(e.code == "Enter"){
                  if(splashName != ""){
                    router.push(`/splash/add/templates?splash_url=${splash_url}&splash_name=${slugify(splashName)}`)
                  }
                }
              }}
              onChange={(e)=>{
                setSplashName(e.target.value)
              }}
              />
              </div>
            </div>
            <div className=" absolute bottom-2 w-full border-t-2 pt-2 flex justify-end">
            <button onClick={()=>router.push(`/splash/add/templates?splash_url=${splash_url}&splash_name=${slugify(splashName)}`)}
            className="right-3 mx-3 button" disabled={splashName == ""}>Siguiente</button>
            </div>
        </CreatePortalLayout>
    )
}

export default AddSplashPage;