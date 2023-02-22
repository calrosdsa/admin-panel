import axios from "axios";
import { useEffect } from "react";
import { FallingLines } from "react-loader-spinner";
import { Id, toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
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
        <Layout title="Paginas Splash">
            <div className="xl:px-10 xl:pt-4 noselect">
        <div onClick={()=>downloadReportExcel("0",ReporteId.ALL_USER)}
           className='button w-min flex  space-x-2 my-4'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
     </svg>
     <span className=" whitespace-nowrap text-sm font-semibold">Descargar reporte general (Excel)</span>
           </div>
              <SolicitudOption
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