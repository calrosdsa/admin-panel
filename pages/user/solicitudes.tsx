import { useEffect } from "react";
import { FallingLines } from "react-loader-spinner";
import Layout from "../../components/layout/Layout";
import DropDown from "../../components/user/solicitudes/DropDown";
import SolicitudOption from "../../components/user/solicitudes/SolicitudOption";
import TableSolicitudes from "../../components/user/solicitudes/TableSolicitudes";
import { getSolicitudList } from "../../context/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../context/reduxHooks";


const Solicitudes = ()=>{
    const uiState = useAppSelector(state=>state.ui)
    const userState = useAppSelector(state=>state.user)
    const dispatch = useAppDispatch()

    useEffect(()=>{
      dispatch(getSolicitudList())
    },[])

    return(
        <>
        <Layout title="Paginas Splash">
         
            <div className="xl:px-10 xl:pt-4 noselect">
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