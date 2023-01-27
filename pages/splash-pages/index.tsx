import { Suspense, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import SplashPagesList from "../../components/splash-pages/SplashPagesList";
import { getSplashPageList } from "../../context/actions/splashActions";
import { useAppDispatch, useAppSelector } from "../../context/reduxHooks";


const SplashPages = ()=>{
    const dispatch = useAppDispatch()
    const splashState = useAppSelector(state=>state.splash)
    const uiState = useAppSelector(state=>state.ui)

    useEffect(()=>{
        dispatch(getSplashPageList())
    },[])

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
            <SplashPagesList
            splasPagesList={splashState.splashPages}
            />
          </div>
            }
        </Layout>
        </>
    )
}

export default SplashPages;