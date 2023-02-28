import EditLayout from '@/components/layout/EditLayout';
import { getSplashPageByCode } from '@/context/actions/splashActions';
import { useAppDispatch, useAppSelector } from '@/context/reduxHooks';
import queryString from 'query-string';
import { DeviceFrameset } from 'react-device-frameset'
import 'react-device-frameset/styles/marvel-devices.min.css'

const MobileView = () =>{
    const splashState = useAppSelector(state=>state.splash)
    const dispatch = useAppDispatch()
    const getSplashData = () =>{
        if(window.location.search != undefined){
            const parsed = queryString.parse(location.search);  
            dispatch(getSplashPageByCode(parsed.code as string))
          }
    }
    return(
        <EditLayout>
            <div className="relative w-full col-span-3 flex justify-center h-screen overflow-auto">
                <DeviceFrameset device="Samsung Galaxy S5" color="black" width={400} height={700}>
                    {splashState.splashPage == undefined ?
                    <div className='grid place-content-center -mt-14 h-screen'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                        stroke="currentColor" className="w-10 h-10 cursor-pointer"
                        onClick={getSplashData}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
               </svg>

                    </div>
                :
                <iframe className="h-[700px] w-[400px]"
                src={splashState.splashPage?.urlSplash}
                id="myiframe"></iframe>
            }
                </DeviceFrameset>
            </div> 
        </EditLayout>
    )
}

export default MobileView;