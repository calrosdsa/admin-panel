
import moment from "moment"


export const formatDate = (date:string | undefined):string=>{
    moment.locale("es")
    if(date == undefined) return "N/A"
    return moment(date).format('lll');
}

export const formatShortDate = (date:string):string =>{
    moment.locale("es")
    if(date == undefined) return "N/A"
    return moment(date).format('LL');
}