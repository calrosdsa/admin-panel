import { getConexiones, getDispositivos } from "@/context/actions/userActions";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import { userActions } from "@/context/slices/user-slice";
import { UserTabDetail } from "@/data/models/redux-models/user-models";
import useEffectOnce from "@/utils/hooks/useEffectOnce";
import ConexionesTable from "./ConexionesTable";
import DispositivosTable from "./DispositivosTable";

interface Props{
    id:string
}
const UsuarioDetailTab = ({id}:Props) =>{
    const dispatch = useAppDispatch()
    const userState = useAppSelector(state=>state.user)
    const uiState = useAppSelector(state=>state.ui)
    const val = true

    const onClickConexionesTab = () =>{
        dispatch(userActions.setUserTabDetail(UserTabDetail.CONEXIONES))
        if(userState.conexiones.length == 0){
            dispatch(getConexiones(id))
        }
    }

    const onClickDispositivosTab = () =>{
        dispatch(userActions.setUserTabDetail(UserTabDetail.DISPOSITIVOS))
        if(userState.dispositivos.length == 0){
            console.log('fetching dispositivos')
            dispatch(getDispositivos(id))
        }
    }

    useEffectOnce(()=>{
        dispatch(getConexiones(id))
    })
    return(
        <div>
           <div className="flex border-b-[1px]">
                <div onClick={()=>onClickConexionesTab()}
                className={`font-semibold tab ${userState.userTabDetail == UserTabDetail.CONEXIONES && "border-primary text-primary border-b-2"}`}>
                    <span>Conexiones</span>
                </div>
                <div onClick={()=>onClickDispositivosTab()}
                className={`font-semibold tab ${userState.userTabDetail == UserTabDetail.DISPOSITIVOS  && "border-primary text-primary border-b-2"}`}>
                    <span>Dispositivos</span>
                </div>
            </div>

            {userState.userTabDetail == UserTabDetail.CONEXIONES &&
            <div className="mt-2">
                <ConexionesTable
                conexiones={userState.conexiones}
                loading={uiState.innerLoading}
                />
            </div>
            } 

            {userState.userTabDetail == UserTabDetail.DISPOSITIVOS &&
            <div className="mt-2 ">
                <DispositivosTable
                dispositivos={userState.dispositivos}
                loading={uiState.innerLoading}
                />
            </div>
            } 
        </div>
    )
}

export default UsuarioDetailTab;