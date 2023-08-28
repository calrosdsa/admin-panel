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
    portal_type:PortalType
    policy_url?:string
}

type MediaPortal = {
    id:number
    url?:string,
    video_url?:string,
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
    show_video:boolean
}

type ConnectionMethod = {
    id_portal?:number
    method:PortalTypeConnection
    label:string
    enabled:boolean
}

enum PortalTypeConnection {
    BASIC_FORM,
    FACEBOOK_VALIDATION_LIKE,
    EMAIL_CON_SOLICITUD
}

export enum PortalType {
    BASIC_TYPE,
    VALIDATE_LIKE_TYPE
}
export interface BasicPortal {
    portal:PortalBase
    portada:MediaPortal
    logo:MediaPortal
    properties:PortalProperties
    settings:SettingsPortal
    connection_methods:ConnectionMethod[]
}


export interface SplashState {
    splashPages: SplashPage[]
    connection_methods:ConnectionMethod[]
    splashPage?:SplashPage
    htmlCode?:string
    splashBaseUrl?:string
    basicPortal?:BasicPortal
}

export type {
    SplashPage,
    MediaPortal as ImagePortal,
    PortalProperties as ContentPortal,
    ConnectionMethod
}