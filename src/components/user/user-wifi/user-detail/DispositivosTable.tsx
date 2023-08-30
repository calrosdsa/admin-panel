import Loader from "@/components/util/loaders/Loader";
import { Conexiones, Dispositivo } from "@/data/models/type/user-models";
import { FallingLines } from "react-loader-spinner";

interface Props {
    dispositivos:Dispositivo[]
    loading:boolean
}
const DispositivosTable = ({dispositivos,loading}:Props) =>{

    return(
        <>
        {loading?
        <Loader
        className="grid place-content-center w-full h-[50vh]"
        />
        :
        <div className="flex justify-center">
<table className="w-full sm:w-1/2 text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
            <tr>
                
                <th scope="col" className="paddingTable text-center">
                    Modelo
                </th>
                <th scope="col" className="paddingTable text-center">
                    Mac Address
                </th>
               
                {/* <th scope="col" className="paddingTable text-center">
                    Dispositivo
                </th> */}
            </tr>
        </thead>
        <tbody className=" text-center">
            {dispositivos.map((item:Dispositivo,index)=>{
                return(
                    <tr key={index} className="bg-white border-b hover:bg-gray-100">
           
                <td 
                className="paddingTable whitespace-nowrap">
                    {item.modelo}
                </td>
                <td className="paddingTable">
                    {item.macAddress}
                </td>
                {/* <td className="paddingTable whitespace-nowrap text-center">
                    {item.modelo}
                </td> */}
               
            </tr>
                )})}
        </tbody>
    </table>
        </div>
}
    </>
    )
}

export default DispositivosTable;