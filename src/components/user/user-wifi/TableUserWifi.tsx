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
        
            
    <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
            <tr>
            <th scope="col" className="">
                </th>
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
            {users.map((item,idx)=>{
                return(
                    <tr key={item.id} className="bg-white border-b hover:bg-gray-100">
            <td className="pl-2">
                    {idx + 1}
                </td>
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