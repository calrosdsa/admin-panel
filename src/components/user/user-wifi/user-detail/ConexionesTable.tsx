import { Conexiones } from "@/data/models/type/user-models";
import { FallingLines } from "react-loader-spinner";

interface Props {
    conexiones:Conexiones[]
    loading:boolean
}
const ConexionesTable = ({conexiones,loading}:Props) =>{

    return(
        <>
        {loading ?
        <div className='grid place-content-center w-full h-[50vh]'>
        <FallingLines
        color="#0406ee"
        width="110"
        visible={true}
        // ariaLabel='falling-lines-loading'
        />
        </div>
        :
<table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
            <tr>
                <th scope="col" className="paddingTable flex justify-center">
                    <div className="flex items-center">      
                    Fecha de Conexion
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" 
                     aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg>
                    </div>
                </th>
                <th scope="col" className="paddingTable text-center">
                    Ssid
                </th>
                <th scope="col" className="paddingTable text-center">
                    Navegador
                </th>
               
                <th scope="col" className="paddingTable text-center">
                    Dispositivo
                </th>
            </tr>
        </thead>
        <tbody className=" text-center">
            {conexiones.map((item:Conexiones,index)=>{
                return(
                    <tr key={index} className="bg-white border-b hover:bg-gray-100">
           
                <td 
                className="paddingTable whitespace-nowrap">
                    {item.dateConnection}
                </td>
                <td className="paddingTable">
                    {item.ssid}
                </td>
                {/* <td className="paddingTable whitespace-nowrap text-center">
                    {item.modelo}
                </td> */}
                <td  className="paddingTable font-medium text-gray-900 text-center">
                    {item.navegador} {item.versionNavegador}
                </td>
                <td className="paddingTable whitespace-nowrap">
                    {item.SO} {item.versionSO} {item.modelo}
                </td>
            </tr>
                )})}
        </tbody>
    </table>
    }
        </>
    )
}

export default ConexionesTable;