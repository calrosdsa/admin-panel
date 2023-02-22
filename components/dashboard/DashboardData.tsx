import axios from "axios";
import { Id, toast } from "react-toastify";
import { donwloadReportLastTenDays, donwloadReportLastTenDaysExcel } from "../../context/actions/dashboardActions";
import { useAppDispatch, useAppSelector } from "../../context/reduxHooks";
import { ReporteId } from "../../data/models/redux-models/dashboard-model";
import LikeWeekChart from "./charts/LikeWeekChart";

const DashboardData = ()=>{
    const dashboardState = useAppSelector(state=>state.dashboard)
    const uiState = useAppSelector(state=>state.ui)
    const dispatch = useAppDispatch()
    // useEffect(()=>{
    //     dispatch(getDataLikeForWeek())
    // },[])
    const downloadReport = (userwifi:string,idProgress:number) =>{
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
            if(dashboardState.ongoingProcess.includes(idProgress)){
                toast.info("Hay una descarga en curso.")
            }else{
            let id:Id;
                id = toast.loading(
                <div className="grid">
                    <span className="text-xs">{ReporteId.ALL_USER == idProgress ? "Descargando Reporte General.Porfavor espere..."
                    :"Descargando Reporte (solo usuarios de la red).Porfavor espere..."
                    }</span>
                   <button onClick={()=>source.cancel("Request cancelada")}
                   className="text-xs button">Cancelar Descarga</button>
                </div>
                )
            dispatch(donwloadReportLastTenDays(userwifi,idProgress,id,source))
        }
    }

    // const downloadReportExcel = (userwifi:string,idProgress:number) =>{
    //     const cancelToken = axios.CancelToken;
    //     const source = cancelToken.source();
    //         if(dashboardState.ongoingProcess.includes(idProgress)){
    //             toast.info("Hay una descarga en curso.")
    //         }else{
    //         let id:Id;
    //             id = toast.loading(
    //             <div className="grid">
    //                 <span className="text-xs">{ReporteId.ALL_USER == idProgress ? "Descargando Reporte General.Porfavor espere..."
    //                 :"Descargando Reporte (solo usuarios de la red).Porfavor espere..."
    //                 }</span>
    //                <button onClick={()=>source.cancel("Request cancelada")}
    //                className="text-xs button">Cancelar Descarga</button>
    //             </div>
    //             )
    //         dispatch(donwloadReportLastTenDaysExcel(userwifi,idProgress,id,source))
    //     }
    // }
   

    return(
        <div className=" max-w-xl mx-auto lg:px-2 lg:pt-4 flex flex-col lg:h-screen lg:overflow-auto ">
        <div className=''>

            <div className="flex flex-wrap gap-x-2 gap-y-3">
          <div onClick={()=>downloadReport("1",ReporteId.USER_RED)}
           className='button w-min flex  space-x-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
     </svg>
     <span className=" whitespace-nowrap text-sm font-semibold">Descargar reporte (solo usarios de la red)</span>
           </div>
           <div onClick={()=>downloadReport("0",ReporteId.ALL_USER)}
           className='button w-min flex  space-x-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
     </svg>
     <span className=" whitespace-nowrap text-sm font-semibold">Descargar reporte general</span>
           </div>

           {/* <div onClick={()=>downloadReportExcel("0",ReporteId.ALL_USER)}
           className='button w-min flex  space-x-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
     </svg>
     <span className=" whitespace-nowrap text-sm font-semibold">Descargar reporte general (Excel)</span>
           </div> */}


        </div>
        </div>


        <div className=" text-center mt-10 grid">
        <span className="text-lg font-semibold">Cantidad de me gusta obtenidos en los últimos 7 días.</span>
        <span className="font-semibold">(usuarios de la red)</span>
        <LikeWeekChart
        data={dashboardState.likesForWeekUserWifi}
        />
        </div>


        <div className=" text-center mt-10 grid">
        <span className="text-lg font-semibold">Cantidad de me gusta obtenidos en los últimos 7 días.</span>
        <span className="font-semibold">(general)</span>
        <LikeWeekChart
        data={dashboardState.likesForWeek}
        />
        </div>
        </div>
    )
}

export default DashboardData;
