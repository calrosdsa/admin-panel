import EditLayout from "@/components/layout/EditLayout"
import SwitchComponent from "@/components/layout/SwitchComponent";
import { getSplashPageByCode } from "@/context/actions/splashActions";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import { splashActions } from "@/context/slices/splash-slice";
import { uiActions } from "@/context/slices/ui-slice";
import useEffectOnce from "@/utils/hooks/useEffectOnce";
import axios from "axios";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const AuthMethod = () =>{
  const base_url = process.env.PUBLIC_URL

    const dispatch = useAppDispatch()
    const splashState = useAppSelector(state=>state.splash)
    const [htmlCode,setHtmlCode] = useState("")
    const [facebookLogin,setFacebookLogin] = useState(false)
    const [formLogin,setFormLogin] = useState(false)
    const [phoneNumberLogin,setPhoneNumberLogin] = useState(false)
    const [instagramLogin,setInstagramLogin ] = useState(false)
    const [linkedinLogin,setLinkedinLogin] = useState(false)
    
    const getButtonLogins = ()=>{
        document.getElementById("buttonLoginFacebook") != undefined && setFacebookLogin(true)
        document.getElementById("buttonLoginEmail") != undefined && setFormLogin(true)
        document.getElementById("buttonLoginPhoneNumber") != undefined && setPhoneNumberLogin(true)
        document.getElementById("buttonLoginInstagram") != undefined && setInstagramLogin(true)
        document.getElementById("buttonLoginLinkedin") != undefined && setLinkedinLogin(true)
        
    }


    const getHtmlFromApi = async() =>{
        try{
            dispatch(uiActions.setLoading(true))
            // const response = await axios.get(`http://localhost:1323/transporte3/`)
            const response = await axios.get(splashState.splashPage?.urlSplash as string,{
                headers:{
                  'Cache-Control': 'no-cache',
                  'Pragma': 'no-cache',
                  'Expires': '0',
                }
              })
            const codeHtml = response.data
            setHtmlCode(codeHtml)
            dispatch(splashActions.setHtmlCode(codeHtml))
            dispatch(uiActions.setLoading(false))
        }catch(err:any){
            dispatch(uiActions.setLoading(false))
        }
      }

    const enabledButton = (id:string,bool:boolean,clickfunction:string,titulo?:string,src?:string) => {
            const portal = document.querySelector('#portal')
            if(bool){
                document.getElementById(id)?.remove();
            }else{
                if(portal == undefined){
                    const wrapper = document.getElementById("wrapperButton")
                    wrapper?.insertAdjacentHTML('beforeend',`<button id="${id}"
                    onclick="${clickfunction}" class="button button1 noselect">
                    ${titulo}
                    </button>`)
                }else{
                    const wrapper = document.getElementById("wrapperButton")
                    wrapper?.insertAdjacentHTML('beforeend',`<button id="${id}" onclick="${clickfunction}">
                    <img style="width: 48px;height: 48px;"  src="${src}" alt="">
                  </button>`)
                }
            }
    }

    const saveChanges = async() =>{
        const html = document.getElementById("core")?.innerHTML
        const formData = new FormData()
        formData.append('html',html as string)
        formData.append('filename',splashState.splashPage?.name as string)
        const id = toast.loading("Porfavor espere...")
        try{
              const res =await axios.post(`${base_url}/upload/template/`,formData)
              // const res =await axios.post(`http://localhost:1323/upload2`,formData)
                toast.update(id, {render: res.data, type: "success", isLoading: false,autoClose:5000});
                dispatch(uiActions.setOpenDialog(false))

          }catch(err:any){
                dispatch(uiActions.setOpenDialog(false))
                toast.update(id, {render:err.message, type: "error", isLoading: false ,autoClose:5000});
          }
      }

    useEffect(()=>{
        getButtonLogins()
    },[htmlCode])
    

    useEffect(()=>{
    getHtmlFromApi()
    },[splashState.splashPage])
    useEffectOnce(()=>{
    if(window.location.search != undefined){
        const parsed = queryString.parse(location.search);  
        dispatch(getSplashPageByCode(parsed.code as string))
        }
    })


    return(
        <EditLayout
        saveChanges={saveChanges}>
            <div className="relative">
                <div className="mx-auto max-w-xl pt-20">
                <div
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
        </div>
                <button onClick={getButtonLogins}>
                    Guardar Cambios
                </button>
                </div>
            <div
            id="core"
            className="hidden"
            dangerouslySetInnerHTML={{__html:htmlCode as string}}
            />
            </div>
        </EditLayout>
    )
}

export default AuthMethod;