import DashboardData2 from "@/components/dashboard/DashboardData2";
import Layout from "@/components/layout/layout";
import TableUserWifi from "@/components/user/user-wifi/TableUserWifi";
import { donwloadReportLastTenDays, donwloadReportTest } from "@/context/actions/dashboardActions";
import { getUserList } from "@/context/actions/userActions";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import { ReporteId } from "@/data/models/redux-models/dashboard-model";
import axios from "axios";
import { useEffect } from "react";
import { FallingLines } from "react-loader-spinner";
import { Id, toast } from "react-toastify";


const Users = () =>{
    const userState = useAppSelector(state=>state.user)
    const dashboardState = useAppSelector(state=>state.dashboard)
    const uiState = useAppSelector(state=>state.ui)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        if(userState.users.length == 0){
            dispatch(getUserList())
        }
    },[])

    const downloadReport = (idProgress:number) =>{
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
            if(dashboardState.ongoingProcess.includes(idProgress)){
                toast.info("Hay una descarga en curso.")
            }else{
            let id:Id;
                id = toast.loading(
                <div className="grid">
                    <span className="text-xs">{ReporteId.ALL_USER == idProgress
                     ? "Descargando Reporte General.Porfavor espere..."
                    :"Descargando Reporte (solo usuarios de la red).Porfavor espere..."
                    }</span>
                   <button onClick={()=>source.cancel("Request cancelada")}
                   className="text-xs button">Cancelar Descarga</button>
                </div>
                )
            dispatch(donwloadReportTest(idProgress,id,source))
        }
    }
    return(

        <Layout>
            <div className="xl:pt-1 pt-10 ">
            <button onClick={()=>downloadReport(ReporteId.USER_RED)}
           className='button w-min flex items-center space-x-2 rounded-none'>
         
     <span className=" whitespace-nowrap text-sm font-semibold">Encuestas</span>
           </button>
                {/* <DashboardData2/> */}
            {uiState.innerLoading ?
      <div className='grid place-content-center w-full h-[50vh]'>
          <FallingLines
          color="#0406ee"
          width="110"
          visible={true}
          // ariaLabel='falling-lines-loading'
          />
          </div>
          :

              <TableUserWifi
              users={userState.users}
              ids={userState.ids}
              />
               }
            </div>
        </Layout>
    )
}

export default Users;