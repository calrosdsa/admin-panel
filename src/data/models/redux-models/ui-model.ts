export interface ToastData {
    title:string,
    id?:number,
    isShowed:boolean
}


type PaginationProps = {
    currentPage:number
    totalCount:number
}



export interface UiState {
    // showLoginDialog:boolean,
    // showSignUpDialog:boolean,
    // showSideBar:boolean,
    // showMenuDialog:boolean,
    // openCreateUserDialog:boolean,
    loading:boolean
    innerLoading:boolean
    openDialog:boolean
    errorMessage:string
    buttonText:string
    isMobile:boolean
    initAnimation:boolean
    pathName:string
    execute:boolean
    totalCount?:number
    // shouldFetch:boolean,
    // dialogLoading:boolean,
}

export type {
    PaginationProps
}