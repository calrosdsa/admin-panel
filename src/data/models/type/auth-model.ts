export enum Roles{
    cliente,
    funcionario,
    cliente_admin,
    funcionario_admin
}

export interface UserAuth{
    // pk:string,
    username:string,
    role:Roles,
    token:string,
}

export interface ErrorLogin {
    password?:string
    email?:string
}
export type Settings = {
    id:string
    idClient:string
    idPageFacebook:string
    tokenPageFacebook:string
}
export type User = {
    id:string
    fullName:string
    email:string
    telephone?:string
    created_at:string
    idClient:string
    idRol:string
    idTipoUsuarios:string
    status:string
}
export interface AuthModel{
    isAuthenticated:boolean,
    authLoading:boolean,
    rol?:string,
    errorLogin?:ErrorLogin
    username:string,
    postUrl:string,
    settings?:Settings
    user?:User
    // user?:UserAuth,
    // errorRegistration?:ErrorRegistration
}
