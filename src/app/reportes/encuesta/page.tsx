"use client"
import DashboardData2 from "@/components/dashboard/DashboardData2";
import Layout from "@/components/layout/layout";
import TableUserEncuestas from "@/components/user/encuestas/TableUserEncuestas";
import TableUserWifi from "@/components/user/user-wifi/TableUserWifi";
import Pagination from "@/components/util/pagination/Pagination";
import { donwloadReportLastTenDays, donwloadReportTest } from "@/context/actions/dashboardActions";
import { getEncuestas, getUserList } from "@/context/actions/userActions";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import { ReporteId } from "@/data/models/type/dashboard-model";
import { Encuesta } from "@/data/models/type/user-models";
import { usePagination } from "@/utils/hooks/usePagination";
import axios from "axios";
import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { Id, toast } from "react-toastify";


const Users = () =>{
    const userState = useAppSelector(state=>state.user)
    const dashboardState = useAppSelector(state=>state.dashboard)
    const uiState = useAppSelector(state=>state.ui)
    const [ currentPage,setCurrentPage] = useState(1)
    const [encuestas,setEncuestas] = useState<Encuesta[]>([])
    const dispatch = useAppDispatch()
    const pageSize = 30
    
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

    const onNext=()=>{
        if(uiState.totalCount != undefined && currentPage < uiState.totalCount){
            setCurrentPage(currentPage + 1)
            const inicio = pageSize * currentPage
            setEncuestas(userState.encuestas.slice(inicio,inicio+pageSize))
        }
    }

    const onPrev = () =>{
        if(currentPage > 1){
            setCurrentPage(currentPage - 1)
            console.log(currentPage)
            const page = currentPage -1
            const inicio = pageSize * page -pageSize
            const end = page *pageSize
            // console.log(inicio,end)
            setEncuestas(userState.encuestas.slice(inicio,end))
        }
    }

    const setPage = (p:number) => {
        setCurrentPage(p)
        console.log(p)
        const start = pageSize * (p-1)
        const end = p * pageSize
        // console.log(start,end)
        setEncuestas(userState.encuestas.slice(start,end))
    }

    useEffect(()=>{
        if(userState.encuestas.length == 0){
            dispatch(getEncuestas())
        }
    },[])

    // useEffect(()=>{
    //     if(currentPage == 1){
    //         setEncuestas(userState.encuestas.slice(0,pageSize))
    //     }
    // },[userState.encuestas])
    return(
        <Layout>
            <div className="xl:pt-1 pt-10 relative px-2">
                <div className=" flex justify-between items-center mt-2">

            <button onClick={()=>downloadReport(ReporteId.USER_RED)}
           className='button w-min flex items-center space-x-2 rounded-none'>
           <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="25px" height="25px" className="mr-1">
            <path fill="#4CAF50" d="M41,10H25v28h16c0.553,0,1-0.447,1-1V11C42,10.447,41.553,10,41,10z"/>
            <path fill="#FFF" d="M32 15H39V18H32zM32 25H39V28H32zM32 30H39V33H32zM32 20H39V23H32zM25 15H30V18H25zM25
            25H30V28H25zM25 30H30V33H25zM25 20H30V23H25z"/><path fill="#2E7D32" d="M27 42L6 38 6 10 27 6z"/>
            <path fill="#FFF" d="M19.129,31l-2.411-4.561c-0.092-0.171-0.186-0.483-0.284-0.938h-0.037c-0.046,0.215-0.154,
            0.541-0.324,0.979L13.652,31H9.895l4.462-7.001L10.274,17h3.837l2.001,4.196c0.156,0.331,0.296,0.725,0.42,1.179h0.0
            4c0.078-0.271,0.224-0.68,0.439-1.22L19.237,17h3.515l-4.199,6.939l4.316,7.059h-3.74V31z"/></svg>
                <span className=" whitespace-nowrap text-sm font-semibold">Descargar Reporte</span>
           </button>
           {/* {uiState.totalCount != undefined &&
               <Pagination currentPage={currentPage} setPage={setPage}
               totalCount={uiState.totalCount} onPrev={onPrev} onNext={onNext}
               />
            } */}

        </div>
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

              <TableUserEncuestas
            //   users={encuestas}
               users={userState.encuestas}
              ids={userState.ids}
              currentPage={currentPage}
              />
               }
            </div>
        </Layout>
    )
}

export default Users;