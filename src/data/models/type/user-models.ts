export type UserWifi = {
    id:string
    idFb?:string
    fullName:string
    mail:string
    birthday:string
    ci:string
    movil:string
    gender:string
    image:string
    cantConexion:number
    cantDispositivo:number  
    firstStart:string
    created_at:string
    updated_at:string
}

export type UserBusiness = {
    id:string
    fullName:string
    email:string
    telephone?:string
    status:string
    idRol:string
}

export type Dispositivo = {
    id:string
    idSistemaOperativo?:string
    idMarca?:string
    idTipo?:string
    modelo?:string
    macAddress?:string
    idUserWifi?:string
}

export type Conexiones = {
    dateConnection?:string
    accesspoint?:string
    ssid?:string
    tipoconexion?:string
    navegador?:string
    versionNavegador?:string
    modelo?:string
    SO?:string
    versionSO?:string
    tipoDispositivo?:string
    macDispositivo?:string
}

export enum SolicitudState {

}

export enum Order {
    ASCENDENTE,
    DESCENDENTE
}

export enum UserRol {
    ADMIN,
    REPORTE,
}

export enum UserTabDetail {
    DISPOSITIVOS,
    CONEXIONES,
}

export type UserSolicitud  = {
    id:string
    fullName:string
    mail:string
    message:string
    status:string
    dateRequest:string
}


export interface Encuesta extends UserWifi {
  esFumador:string
  marca:string
  fecha:string
}


export interface UserState {
    solicitudes:UserSolicitud[],
    params:string,
    ids:string[]
    users:UserWifi[]
    user?:UserWifi
    dispositivos:Dispositivo[]
    conexiones:Conexiones[]
    userTabDetail:UserTabDetail
    encuestas:Encuesta[]
    userBussiness:UserBusiness[]
}