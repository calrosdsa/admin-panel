

export type SplashPage = {
    id?: string
    code?:string
    name?:string
    type?:string
    status?:string
    urlPath?:string
    urlSplash?:string
}


export interface SplashState {
    splashPages: SplashPage[]
    splashPage?:SplashPage
    htmlCode?:string
    splashBaseUrl?:string
}