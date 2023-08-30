import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import { splashActions } from "@/context/slices/splash-slice";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/navigation";
import { SplashPage } from "../../data/models/type/splash-data";
import { getSplashPageList } from "@/context/actions/splashActions";

interface Props{
    splasPagesList:SplashPage[]
}
const SplashPagesList = ({splasPagesList}:Props)=>{
    const router = useRouter()
    const uiState = useAppSelector(state=>state.ui)
    const dispatch = useAppDispatch()
    const { t, lang } = useTranslation('common')


    const isSplashPageActive = (estado:string | undefined)=>{
        return estado == "0" ? "Activo":"Inactivo"
    }

    return(
        <>
            <div className="relative overflow-x-auto  w-full h-screen">
            {uiState.innerLoading  &&
            <div className=" absolute left-1/2 top-40 xl:top-32  z-10 -translate-x-1/2">
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
            <div className="p-2 pt-12 xl:pt-2">
                <div className="flex space-x-2 py-2">
    <button className="button" onClick={()=>{
        dispatch(getSplashPageList())
    }}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
    className="w-5 h-5 text-gray-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
    </button>            
        </div>

    <table className="w-full text-sm text-left text-gray-500 relative">
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