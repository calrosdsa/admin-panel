import EditLayout from "@/components/layout/EditLayout"
import SwitchComponent from "@/components/layout/SwitchComponent";
import { getSplashPageByCode } from "@/context/actions/splashActions";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import { splashActions } from "@/context/slices/splash-slice";
import { uiActions } from "@/context/slices/ui-slice";
import useEffectOnce from "@/utils/hooks/useEffectOnce";
import axios from "axios";
import { Button } from "flowbite-react";
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
    
    const getButtonLogins = ()=>{
        const facebookButtonLogin = document.getElementById("buttonLoginFacebook") != undefined && setFacebookLogin(true)
        console.log(facebookButtonLogin)
        const emailButtonLogin = document.getElementById("buttonLoginEmail") != undefined && setFormLogin(true)
        console.log(emailButtonLogin)
    }


    const getHtmlFromApi = async() =>{
        try{
            dispatch(uiActions.setLoading(true))
            // const response = await axios.get(`http://localhost:1323/transporte3/`)
            const response = await axios.get(splashState.splashPage?.urlSplash as string)
            const codeHtml = response.data
            setHtmlCode(codeHtml)
            dispatch(splashActions.setHtmlCode(codeHtml))
            dispatch(uiActions.setLoading(false))
        }catch(err:any){
            dispatch(uiActions.setLoading(false))
        }
      }

    const enabledButton = (id:string,bool:boolean,htmlContent:string) => {
            if(bool){
                document.getElementById(id)?.remove();
                // const ele =  elementButton?.parentElement?.removeChild(elementButton);
                const core = document.getElementById("core")
                // console.log(ele)
                console.log(core)
            }else{
                const wrapper = document.getElementById("wrapper-button")
                wrapper?.insertAdjacentHTML('beforeend',htmlContent)
                console.log(wrapper)

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
            <div>
                <div className="mx-auto max-w-xl pt-20">
                <div
                    className="flex flex-col gap-4 py-5  px-3 grid-cols-2 col-span-1"
                    id="toggle"
                    >
                <SwitchComponent
                isChecked={facebookLogin}
                onChange={(e)=>{
                    setFacebookLogin(e)
                    enabledButton("buttonLoginFacebook",facebookLogin,`<div id="buttonLoginFacebook" onclick="loginFacebook()" tabindex="-1" style="display: flex;" class="loginButton">
                    <svg id="facebooksvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="40px" height="37px"><path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path></svg>
                    <span id="buttonText" style="font-weight: 600;color: white;font-size: 15px;">Continuar con facebook</span>
                  </div>`)
                }}
                title="Login con Facebook"
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
        </div>
                <Button onClick={getButtonLogins}>
                    Guardar Cambios
                </Button>
                </div>
            </div>
            <div
            id="core"
            className="hidden"
            dangerouslySetInnerHTML={{__html:htmlCode as string}}
            />
        </EditLayout>
    )
}

export default AuthMethod;