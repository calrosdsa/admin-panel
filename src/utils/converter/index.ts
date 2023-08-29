import { UserRol } from "@/data/models/type/user-models";

export const getUserBussinessRolName = (rol:UserRol):string =>{
    switch(rol){
        case UserRol.ADMIN:
            return "Usuario admin"
        case UserRol.REPORTE:
            return "Usuario reporte"
        default:
            return ""
    }
}