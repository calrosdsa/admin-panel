"use client"
import EditLayout from "@/components/layout/EditLayout"
import SwitchComponent from "@/components/layout/SwitchComponent";
import NoCodeEditor from "@/components/splash/editor/NoCodeEditor";
import EditComponent from "@/components/util/input/EditComponent";
import { getSplashPageByCode, saveSplashPageSettings } from "@/context/actions/splashActions";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import { splashActions } from "@/context/slices/splash-slice";
import { uiActions } from "@/context/slices/ui-slice";
import useEffectOnce from "@/utils/hooks/useEffectOnce";
import axios from "axios";
import queryString from "query-string";


const AuthMethod = () =>{
  const base_url = process.env.PUBLIC_URL
  const dispatch = useAppDispatch()
  const basicPortal = useAppSelector(state=>state.splash.basicPortal) 

  const saveChanges = async() =>{
    dispatch(saveSplashPageSettings())
  }

  const applyChanges = (addLoader:()=>void,removeLoader:()=>void,value:string,name:string) =>{
       addLoader()
        if(basicPortal == undefined) return
        dispatch(splashActions.setSplashData({
            ...basicPortal,
            settings:{
                ...basicPortal?.settings,
                [name]:value
            }
        }))
        removeLoader()
}
  

  useEffectOnce(()=>{
    if(window.location.search != undefined){
        const parsed = queryString.parse(location.search);  
        console.log(basicPortal,"--------------------")
        if(basicPortal == undefined){
            dispatch(getSplashPageByCode(parsed.code as string))
        }
      }
  })
    

    return(
        <EditLayout
        saveChanges={saveChanges}>
            <div className="relative">
                <div className="grid xl:grid-cols-2 sm:px-10 pt-5">

                 <EditComponent
                 label="Url de Redirección"
                 content={basicPortal?.settings.url_redirect || ""}
                 edit={(addLoader,removeLoader,value)=>applyChanges(addLoader,removeLoader,value,"url_redirect")}
                 />   

                {/* <div
                    className="flex flex-col gap-4 py-5  px-3 grid-cols-2 col-span-1"
                    id="toggle"
                    >        
                <SwitchComponent
                isChecked={facebookLogin}
                onChange={(e)=>{
                    setFacebookLogin(e)
                    enabledButton("buttonLoginFacebook",facebookLogin,`getAccessWithFacebook()`,"Facebook","https://teclu-portal.s3.sa-east-1.amazonaws.com/media/facebook-square.png")
                }}
                title="Login con Facebook"
                />
                <SwitchComponent
                isChecked={phoneNumberLogin}
                onChange={(e)=>{
                    setPhoneNumberLogin(e)
                    enabledButton("buttonLoginPhoneNumber",phoneNumberLogin,`getAccessWithPhone()`,"Phone Number","https://teclu-portal.s3.sa-east-1.amazonaws.com/media/phone-square.png")
                }}
                title="Login con Phone Number"
                />
                <SwitchComponent
                isChecked={formLogin}
                onChange={(e)=>{
                    setFormLogin(e)
                    enabledButton("buttonLoginEmail",formLogin,` <div id="buttonLoginEmail" onclick="loginwithSms()" tabindex="-1" class="loginButtonEmail" style="display: flex;">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 30px;height: 30px;padding: 5px;">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path>
                    </svg>				   
                    <span id="buttonText2" style="font-weight: 600;font-size: 15px;">Continuar con email</span>
                  </div> `)
                }}
                title="Login con email"
                />
                <SwitchComponent
                isChecked={instagramLogin}
                onChange={(e)=>{
                    setInstagramLogin(e)
                    enabledButton("buttonLoginInstagram",instagramLogin,`getAccessWithInstagram()`,"Instagram","https://teclu-portal.s3.sa-east-1.amazonaws.com/media/instagram-square.png")
                }}
                title="Login con Instagram"
                />
                <SwitchComponent
                isChecked={linkedinLogin}
                onChange={(e)=>{
                    setLinkedinLogin(e)
                    enabledButton("buttonLoginLinkedin",linkedinLogin,'getAccessWithLinkedin()',"Linkedin","https://teclu-portal.s3.sa-east-1.amazonaws.com/media/linkdin-square.png")
                }}
                title="Login con Linkedin"
                />
        </div> */}
            
                </div>
            
            </div>
        </EditLayout>
    )
}

export default AuthMethod;