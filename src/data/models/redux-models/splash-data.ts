import { type } from "os"

type SplashPage = {
    id?: string
    code?:string
    name?:string
    type?:string
    status?:string
    urlPath?:string
    urlSplash?:string
}

type ImagePortal = {
    url?:string,
    height?:string,
    width?:string,
    border_radius?:string
    object_fit?:string
}

type PortalCommon = {
    bucket_name:string
    path_name:string
    url:string
}

type  ContentPortal ={
    button_color:string
    background:string
}

export interface BasicPortal extends PortalCommon {
    image?:ImagePortal
    logo?:ImagePortal
    content:ContentPortal
}


export interface SplashState {
    splashPages: SplashPage[]
    splashPage?:SplashPage
    htmlCode?:string
    splashBaseUrl?:string
    basicPortal?:BasicPortal
}

export type {
    SplashPage,
    ImagePortal,
    ContentPortal,
}