import Layout from "../../components/layout/Layout";
import { useAppSelector } from "../../context/reduxHooks";


const Solicitudes = ()=>{
    const uiState = useAppSelector(state=>state.ui)


    return(
        <>
        <Layout title="Paginas Splash">
            {uiState.loading?
          <div>
            loading
          </div>
            // ariaLabel='falling-lines-loading'
            :
            <div className="px-10 mt-10">
          </div>
            }
        </Layout>
        </>
    )
}

export default Solicitudes;