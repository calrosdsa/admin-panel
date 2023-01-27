import { useRouter } from "next/router";
import { SplashPage } from "../../data/models/redux-models/splash-data";

interface Props{
    splasPagesList:SplashPage[]
}
const SplashPagesList = ({splasPagesList}:Props)=>{
    const router = useRouter()

    const isSplashPageActive = (estado:string)=>{
        return estado == "0" ? "Activo":"Inactivo"
    }

    return(
        <div>
           
<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                    Url
                </th>
                <th scope="col" className="px-6 py-3">
                    Estado
                </th>
               
            </tr>
        </thead>
        <tbody>
        {splasPagesList.map((item:SplashPage)=>{
                return(
            <tr key={item.id} className="bg-white border-b ">
                <td onClick={()=>router.push(`/splash-pages/editor?code=${item.code}`)} 
                 className="px-6 py-4 font-medium text-primary whitespace-nowrap cursor-pointer ">
                    {item.name}
                </td>
                <th scope="row" className="px-6 py-4  underline cursor-pointer">
                 <a className=" font-normal" href={item.urlSplash} target="_blank"
                 >https://teclu-portal.s3.sa-east-1.amazonaws.com/ypfb-transporte</a>
                </th>
                <td className="px-6 py-4">
                    {isSplashPageActive(item.status)}
                </td>
            </tr>
                )
            })}
           
        </tbody>
    </table>
</div>

           
        </div>
    )
}

export default SplashPagesList;