
export type LikeData ={
    x:string
    y:number
}

export enum ReporteId{
    ALL_USER,
    USER_RED,
    ALL_USER_POST,
    USER_RED_POST
}

export interface DashBoardState {
    likesForWeek:LikeData[]
    likesForWeekUserWifi:LikeData[]
    ongoingProcess:number[]

}