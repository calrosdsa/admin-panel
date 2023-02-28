import { deleteCookie } from "cookies-next"

export const redirectToLogin = ()=>{
    if(typeof window != 'undefined'){
        deleteCookie("_auth")
        window.location.replace(window.location.origin + `/auth/login?redirect=${window.location.href}`)
    }
}