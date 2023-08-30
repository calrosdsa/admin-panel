import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../context/reduxHooks";
import { userActions } from "../../../context/slices/user-slice";
import { Order, UserSolicitud, UserWifi } from "../../../data/models/type/user-models";
import { formatDate, formatShortDate } from "../../../utils/converter/date";
import LongText from "../../LongText";
import { getUserList } from "@/context/actions/userActions";

interface Props{
    users:UserWifi[]
    ids:string[]
}
const TableUserWifi = ({users,ids}:Props) =>{
    const dispatch = useAppDispatch()
    const [ orderState, setOrderState ] = useState(Order.DESCENDENTE)
    const [ orderStateName,setOrderStateName ] = useState(Order.DESCENDENTE)
    const uiState = useAppSelector(state=>state.ui)
    const router = useRouter()
    const changeOrderList = (order:Order)=>{
        if(order == Order.ASCENDENTE) setOrderState(Order.DESCENDENTE); else setOrderState(Order.ASCENDENTE)
        dispatch(userActions.orderSolicitudList(order))
    }

    const changeOrderListByName = (order:Order)=>{
        if(order == Order.ASCENDENTE) setOrderStateName(Order.DESCENDENTE); else setOrderStateName(Order.ASCENDENTE)
        dispatch(userActions.orderSolicitudListByName(order))
    }
    const selectSolicitud=(id:string)=>{
        if(ids.includes(id)){
            dispatch(userActions.removeId(id))
        }else{
            dispatch(userActions.addId(id))
        }
    }

    const navigateToUserProfilePage= (id:string)=>{
        dispatch(userActions.resetForUserDetail())
        router.push(`/user/${id}`)
    }

    return(
        <>
        <div className="relative overflow-x-auto  w-full ">
        {uiState.innerLoading  &&
            <div className=" absolute left-1/2 top-40 xl:top-16  z-10 -translate-x-1/2">
                <div className="flex space-x-2 items-center">
                    <div role="status">
            <svg aria-hidden="true" className="w-4 h-4  text-gray-100 animate-spin  fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
                    </div>
               <span>Cargando portales</span>
                </div>
            </div>
            }
            
    <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
            <tr>
                <th scope="col" className="paddingTable"  onClick={()=>changeOrderListByName(orderStateName)}>
                    Nombre
                    {/* <div className="flex items-center"> 
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" 
                     aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg>
                    </div> */}
                </th>
                <th scope="col" className="paddingTable">
                    Mail
                </th>
                <th scope="col" className="paddingTable text-center">
                    Conexiones
                </th>
                <th scope="col" className="paddingTable text-center">
                    Dispositivos
                </th>
            </tr>
        </thead>
        <tbody>
            {users.map((item)=>{
                return(
                    <tr key={item.id} className="bg-white border-b hover:bg-gray-100">
            
                <td onClick={()=>navigateToUserProfilePage(item.id)}
                className="paddingTable whitespace-nowrap text-primary cursor-pointer">
                    {item.fullName}
                </td>
                <td className="paddingTable">
                    {item.mail}
                </td>
                <td className="paddingTable whitespace-nowrap text-center">
                    {item.cantConexion} conexiones
                </td>
                {/* <td className="paddingTable whitespace-nowrap">
                    {item.gender}
                </td> */}
                <td  className="paddingTable font-medium text-gray-900 text-center">
                    {/* <LongText */}
                    {/* content={item.message} */}
                    {/* limit={140} */}
                    {/* /> */}
                    {/* {formatShortDate(item.birthday)} */}
                    {item.cantDispositivo} dispositivos

                </td>
            </tr>
                )})}
        </tbody>
    </table>
        </div>
        </>
    )
}

export default TableUserWifi;