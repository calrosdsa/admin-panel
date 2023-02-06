import { toast } from "react-toastify";
import { donwloadReportLastTenDays } from "../../context/actions/dashboardActions";
import { useAppDispatch, useAppSelector } from "../../context/reduxHooks";
import LikeWeekChart from "./charts/LikeWeekChart";

const DashboardData = ()=>{
    const dashboardState = useAppSelector(state=>state.dashboard)
    const uiState = useAppSelector(state=>state.ui)
    const dispatch = useAppDispatch()
    // useEffect(()=>{
    //     dispatch(getDataLikeForWeek())
    // },[])
    const downloadReport = (userwifi:string) =>{
        if(uiState.ongoingProcess){
            toast.info("Hay una descarga en curso.")
        }else{
            dispatch(donwloadReportLastTenDays(userwifi))
        }
    }
   

    return(
        <div className="w-full flex flex-col">
        <div className='mt-10'>

            <div className="flex flex-wrap gap-x-2 gap-y-3">
          <div onClick={()=>downloadReport("1")}
           className='button w-min flex  space-x-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
     </svg>
     <span className=" whitespace-nowrap text-sm">Descargar reporte (solo usarios de la red)</span>
           </div>
           <div onClick={()=>downloadReport("0")}
           className='button w-min flex  space-x-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
     </svg>
     <span className=" whitespace-nowrap text-sm">Descargar reporte General</span>
           </div>
        </div>


        </div>
        <div className=" text-center mt-10">
        <span className="text-lg font-semibold">Cantidad de me gusta obtenidos en los últimos 7 días.</span>
        <LikeWeekChart
        data={dashboardState.likesForWeek}
        />
        </div>
        </div>
    )
}

export default DashboardData;
