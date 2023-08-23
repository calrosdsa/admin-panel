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

type SettingsPortal = {
    id:number
    provider:number
    provider_url:string
    url_redirect:string
}

type ImagePortal = {
    id:number
    url?:string,
    height?:string,
    width?:string,
    border_radius?:string
    object_fit?:string
}

type PortalBase = {
    id_portal:number
    bucket_name:string
    path_name:string
    portal_name:string
    url:string
    provider_url:string
    provider:number
}

type  PortalProperties ={
    id:number    
    color:string
    background:string
    text_color:string
    image_background:string
}

export interface BasicPortal {
    portal:PortalBase
    image:ImagePortal
    logo:ImagePortal
    properties:PortalProperties
    settings:SettingsPortal
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
    PortalProperties as ContentPortal,
}