export type From = {
    name:string
    id:string
}

type Sumary = {
    total_count:number
}

export type Like = {
   summary:Sumary
}
type Comment = {
    summary:Sumary
}
type Shares = {
    count:number
}

export type Post = {
    message:string
    created_time: string
    id:string
    full_picture:string
    reactions:Like
    comments?:Comment
    from:From
    permalink_url:string
    shares?: Shares
  }

type Paging = {
    next : string
}

export type Pagination ={
    paging : Paging
}




export type LikeData ={
    x:string
    y:number
}

export enum ReporteId{
    ALL_USER,
    USER_RED,
    ALL_USER_POST,
    USER_RED_POST,
    ALL_USER_EXCEL,
    USER_RED_EXCEL,

}

export interface DashBoardState {
    likesForWeek:LikeData[]
    likesForWeekUserWifi:LikeData[]
    ongoingProcess:number[]

}