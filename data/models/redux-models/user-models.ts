

export type UserSolicitud  = {
    id:string
    fullName:string
    mail:string
    message:string
    status:string
    dateRequest:string
}

export interface UserState {
    solicitudes:UserSolicitud[]
}