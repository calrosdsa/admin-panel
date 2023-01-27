export const redirectToLogin = ()=>{
    if(typeof window != 'undefined'){
        window.location.replace(window.location.origin + `/auth/login?redirect=${window.location.href}`)
    }
}