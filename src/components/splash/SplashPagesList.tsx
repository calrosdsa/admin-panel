import { useAppDispatch } from "@/context/reduxHooks";
import { splashActions } from "@/context/slices/splash-slice";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/navigation";
import { SplashPage } from "../../data/models/type/splash-data";

interface Props{
    splasPagesList:SplashPage[]
}
const SplashPagesList = ({splasPagesList}:Props)=>{
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { t, lang } = useTranslation('common')


    const isSplashPageActive = (estado:string | undefined)=>{
        return estado == "0" ? "Activo":"Inactivo"
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
                <th scope="col" className="paddingTable" >
                    <div className="flex items-center">Nombre</div>
                </th>
                <th scope="col" className="paddingTable">Url</th>
                <th scope="col" className="paddingTable">Estado</th>
                <th scope="col" className="paddingTable " >
                </th>
            </tr>
        </thead>
        <tbody>
        {splasPagesList.map((item:SplashPage)=>{
                return(
                    <tr key={item.id} className="bg-white border-b hover:bg-gray-100"
                    >
            <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="h-4 w-4"/>
                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                </td>
                <td onClick={()=>{
                    dispatch(splashActions.setSplashPage(undefined))
                    dispatch(splashActions.clearPortalData())
                    router.push(`/splash/edit?code=${item.code}`)
                }}  className="paddingTable whitespace-nowrap cursor-pointer text-primary">
                    {item.name}
                </td>
                <td className="paddingTable">
                    <a href={item.urlSplash} className="underline" target="_blank">
                    {item.urlSplash}
                    </a>
                </td>
                <td className="paddingTable whitespace-nowrap">
                {isSplashPageActive(item.status)}
                </td>
                <td className="text-primary font-semibold cursor-pointer" onClick={()=>{
                     dispatch(splashActions.setSplashPage(undefined))
                     dispatch(splashActions.clearPortalData())
                     router.push(`/splash/edit?code=${item.code}`)
                }}> 
                    {t("edit")}
                </td>
                
            </tr>
                )})}
        </tbody>
    </table>
</div>
        </>
        )
    }
    
    export default SplashPagesList;
    //         <div>
               
    // <div className="relative overflow-x-auto">
    //     <Table className="w-full text-sm text-left rounded-none"
    //     striped
    //     hoverable={true}>
    //     <Table.Head>
    //     <Table.HeadCell className="!p-4">
    //         <input type="checkbox" />
    //     </Table.HeadCell>
    //     <Table.HeadCell>
    //       {t("name")}
    //     </Table.HeadCell>
    //     <Table.HeadCell>
    //       Url
    //     </Table.HeadCell>
    //     <Table.HeadCell>
    //         {t("state")}
    //     </Table.HeadCell>
    //     <Table.HeadCell>
    //       <span className="sr-only">
    //         {t("edit")}
    //       </span>
    //     </Table.HeadCell>
    //   </Table.Head>
    //   {}
    //   <Table.Body className="divide-y">
    
    //         {splasPagesList.map((item:SplashPage)=>{
    //             return(
    //                 <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
    //                         <Table.Cell className="!p-4">
    //                             <input type="checkbox" />
    //                         </Table.Cell>
    //                         <Table.Cell onClick={()=>{
    //                             dispatch(splashActions.setSplashPage(undefined))
    //                             router.push(`/splash/edit?code=${item.code}`)
    //                         }} 
    //                         className="whitespace-nowrap font-medium text-gray-900 dark:text-white cursor-pointer">
    //                             {item.name}
    //                         </Table.Cell>
    //                         <Table.Cell>
    //                             <a href={item.urlSplash} target="_blank">{item.urlSplash}</a>
    //                         </Table.Cell>
    //                         <Table.Cell>
    //                             {isSplashPageActive(item.status)}
    //                         </Table.Cell>
    //                         <Table.Cell>
    //                             <a
    //                             href="/tables"
    //                             className="font-medium text-blue-600 hover:underline dark:text-blue-500"
    //                             >{t("edit")}</a>
    //                         </Table.Cell>
    //                 </Table.Row>
    //             // <tr key={item.id} className="bg-white border-b ">
    //             //     <td onClick={()=>router.push(`/splash-pages/editor?code=${item.code}`)} 
    //             //      className="px-6 py-4 font-medium text-primary whitespace-nowrap cursor-pointer ">
    //             //         {item.name}
    //             //     </td>
    //             //     <th scope="row" className="px-6 py-4  underline cursor-pointer">
    //             //      <a className=" font-normal whitespace-nowrap" href={item.urlSplash} target="_blank"  rel="noreferrer" 
    //             //      >{item.urlSplash}</a>
    //             //     </th>
    //             //     <td className="px-6 py-4">
    //             //         {isSplashPageActive(item.status)}
    //             //     </td>
    //             // </tr>
    //                 )
    //             })}           
    //         </Table.Body>
    //     </Table>
    // </div>
    
               
    //         </div>