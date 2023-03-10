import Layout from "@/components/layout/layout";
import axios from "axios";
import { useEffect } from "react";
import { FallingLines } from "react-loader-spinner";
import { Id, toast } from "react-toastify";
import DropDown from "../../components/user/solicitudes/DropDown";
import SolicitudOption from "../../components/user/solicitudes/SolicitudOption";
import TableSolicitudes from "../../components/user/solicitudes/TableSolicitudes";
import { donwloadReportLastTenDaysExcel } from "../../context/actions/dashboardActions";
import { getSolicitudList } from "../../context/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../context/reduxHooks";
import { ReporteId } from "../../data/models/redux-models/dashboard-model";


const Solicitudes = ()=>{
    const uiState = useAppSelector(state=>state.ui)
    const userState = useAppSelector(state=>state.user)
    const dashboardState = useAppSelector(state=>state.dashboard)
    const dispatch = useAppDispatch()

    const downloadReportExcel = (userwifi:string,idProgress:number) =>{
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
          dispatch(donwloadReportLastTenDaysExcel(userwifi,idProgress,id,source))
      }
  }
 

    useEffect(()=>{
      dispatch(getSolicitudList())
    },[])

    return(
        <>
        <Layout>
            <div className=" xl:pt-4 noselect">
           {/* <button onClick={()=>sendRequest()}>Test </button> */}
              <SolicitudOption
              refreshList={()=>dispatch(getSolicitudList())}
              params={userState.params}
              ids={userState.ids}
              />
              {/* <div className="flex justify-between">
              <input type="text" />
              <DropDown/>
              </div> */}
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
              <TableSolicitudes
              solicitudes={userState.solicitudes}
              ids={userState.ids}
              />
               }
               
          </div>
        </Layout>
        </>
    )
}

export default Solicitudes;