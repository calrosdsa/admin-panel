import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppDispatch } from "../../../context/reduxHooks";
import { userActions } from "../../../context/slices/user-slice";
import { Encuesta, Order } from "../../../data/models/redux-models/user-models";
import { formatDate, formatShortDate } from "../../../utils/converter/date";
import LongText from "../../LongText";

interface Props{
    users:Encuesta[]
    ids:string[]
    currentPage:number
}
const TableUserEncuestas = ({users,ids,currentPage}:Props) =>{
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
        <div className="relative overflow-x-auto mt-4">
    <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs truncate text-gray-700 uppercase bg-gray-200 ">
            <tr className="">
                <th>

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
                    Fecha de Registro
                </th>
                {/* <th scope="col" className="paddingTable text-center"> */}
                    {/* Dispositivos */}
                {/* </th> */}
                <th scope="col" className="paddingTable text-center">
                    Es Fumador
                </th>
                <th scope="col" className="paddingTable text-center">
                    Marca de Cigarro
                </th>
                <th scope="col" className="paddingTable text-center">
                 Consentimiento
                </th>
            </tr>
        </thead>
        <tbody>
            {users.map((item,idx)=>{
                return(
                    <tr key={idx} className="bg-white border-b hover:bg-gray-100">
                <td className="paddingTable pl-3 font-medium">
                    {idx + (currentPage-1)*30 + 1}.-
                    <span className="hidden">{item.id}</span>
                </td>

                <td onClick={()=>navigateToUserProfilePage(item.id)}
                className="paddingTable whitespace-nowrap text-primary cursor-pointer">
                    {item.fullName}
                </td>
                <td className="paddingTable">
                    {item.mail}
                </td>
                <td className="paddingTable whitespace-nowrap text-center">
                    {item.fecha}
                </td>
                {/* <td className="paddingTable whitespace-nowrap">
                    {item.gender}
                </td> */}
                {/* <td  className="paddingTable font-medium text-gray-900 text-center ">
                    {item.cantDispositivo} dispositivos

                </td> */}
                <td  className="paddingTable font-medium text-gray-900 text-center">
                    {item.esFumador} 

                </td>
                <td  className="paddingTable font-medium text-gray-900 text-center">
                    {item.marca} 

                </td>
                <td  className="paddingTable font-medium text-gray-900 text-center">
                    {item.esFumador == "Si" ? "Si":""}
                </td>
            </tr>
                )})}
        </tbody>
    </table>
</div>
        </>
    )
}

export default TableUserEncuestas;