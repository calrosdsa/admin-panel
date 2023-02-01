export interface ToastData {
    title:string,
    id?:number,
    isShowed:boolean
}


export interface UiState {
    // showLoginDialog:boolean,
    // showSignUpDialog:boolean,
    // showSideBar:boolean,
    // showMenuDialog:boolean,
    // openCreateUserDialog:boolean,
    loading:boolean,
    errorMessage:string,
    buttonText:string,
    isMobile:boolean,
    initAnimation:boolean,
    pathName:string,
    ongoingProcess:boolean
    // shouldFetch:boolean,
    // dialogLoading:boolean,
}