import CreatePortalLayout from "@/components/layout/CreatePortalLayout";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import { Button, Spinner, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import { useState } from "react";
import slugify from "react-slugify";


const AddSplashPage = () =>{
    const router = useRouter()
    const {splash_url} = router.query
    const [splashName,setSplashName] = useState<string>("")



    return(
        <CreatePortalLayout>
               <div className="p-2 lg:px-4 flex justify-center items-center h-full flex-col w-full">
                <div className="w-11/12 sm:w-2/3">
                <code className="text-sm">{splash_url+slugify(splashName)}</code>
            <TextInput
              id="urlsplashName"
              className="m-2"
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
              required={true}
              />
              </div>
            </div>
            <div className=" absolute bottom-2 w-full border-t-2 pt-2 flex justify-end">
            <Button onClick={()=>router.push(`/splash/add/templates?splash_url=${splash_url}&splash_name=${slugify(splashName)}`)}
            className="right-3 mx-3" disabled={splashName == ""}>Siguiente</Button>
            </div>
        </CreatePortalLayout>
    )
}

export default AddSplashPage;