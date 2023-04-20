import { useState } from "react";
import { useAppDispatch } from "../../../context/reduxHooks";
import { userActions } from "../../../context/slices/user-slice";
import { Order, UserSolicitud } from "../../../data/models/redux-models/user-models";
import { formatDate } from "../../../utils/converter/date";
import LongText from "../../LongText";

interface Props{
    solicitudes:UserSolicitud[]
    ids:string[]
}
const TableSolicitudes = ({solicitudes,ids}:Props) =>{
    const dispatch = useAppDispatch()
    const [ orderState, setOrderState ] = useState(Order.DESCENDENTE)
    const [ orderStateName,setOrderStateName ] = useState(Order.DESCENDENTE)
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

    return(
        <>
        <div className="relative overflow-x-auto mt-5">
    <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
            <tr>
            <th scope="col" className="p-4">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="h-4 w-4"/>
                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
                </th>
                <th scope="col" className="paddingTable"  onClick={()=>changeOrderListByName(orderStateName)}>
                    <div className="flex items-center"> 

                    Nombre
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" 
                     aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg>
                    </div>
                </th>
                <th scope="col" className="paddingTable">
                    Mail
                </th>
                <th scope="col" className="paddingTable">
                    Estado
                </th>
                <th scope="col" className="paddingTable " onClick={()=>changeOrderList(orderState)}>
                    <div className=" flex items-center">
                    Fecha
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" 
                     aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
                    </svg>
                     </div>
                </th>
                <th scope="col" className="px-20 xl:px-10 py-3 w-[200px]">
                    Motivo
                </th>
            </tr>
        </thead>
        <tbody>
            {solicitudes.map((item)=>{
                return(
                    <tr key={item.id} className="bg-white border-b hover:bg-gray-100"
                    onClick={()=>selectSolicitud(item.id)}>
            <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="h-4 w-4"
                        checked={ids.includes(item.id)} onChange={(e)=>console.log(e)}/>
                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                </td>
                <td className="paddingTable whitespace-nowrap">
                    {item.fullName}
                </td>
                <td className="paddingTable">
                    {item.mail}
                </td>
                <td className="paddingTable whitespace-nowrap">
                    {item.status}
                </td>
                <td className="paddingTable whitespace-nowrap">
                    {formatDate(item.dateRequest)}
                </td>
                <td  className="paddingTable font-medium text-gray-900 w-[200px] text-xs">
                    <LongText
                    content={item.message}
                    limit={140}
                    />
                </td>
            </tr>
                )})}
        </tbody>
    </table>
</div>
        </>
    )
}

export default TableSolicitudes;