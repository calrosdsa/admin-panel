import { useAppDispatch } from "@/context/reduxHooks";
import { splashActions } from "@/context/slices/splash-slice";
import { Table } from "flowbite-react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { SplashPage } from "../../data/models/redux-models/splash-data";

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
        <div>
           
<div className="relative overflow-x-auto">
    <Table className="w-full text-sm text-left rounded-none"
    striped
    hoverable={true}>
    <Table.Head>
    <Table.HeadCell className="!p-4">
        <input type="checkbox" />
    </Table.HeadCell>
    <Table.HeadCell>
      {t("name")}
    </Table.HeadCell>
    <Table.HeadCell>
      Url
    </Table.HeadCell>
    <Table.HeadCell>
        {t("state")}
    </Table.HeadCell>
    <Table.HeadCell>
      <span className="sr-only">
        {t("edit")}
      </span>
    </Table.HeadCell>
  </Table.Head>
  {}
  <Table.Body className="divide-y">

        {splasPagesList.map((item:SplashPage)=>{
            return(
                <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="!p-4">
                            <input type="checkbox" />
                        </Table.Cell>
                        <Table.Cell onClick={()=>{
                            dispatch(splashActions.setSplashPage(undefined))
                            router.push(`/splash/edit?code=${item.code}`)
                        }} 
                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {item.name}
                        </Table.Cell>
                        <Table.Cell>
                            {item.urlSplash}
                        </Table.Cell>
                        <Table.Cell>
                            {isSplashPageActive(item.status)}
                        </Table.Cell>
                        <Table.Cell>
                            <a
                            href="/tables"
                            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                            >{t("edit")}</a>
                        </Table.Cell>
                </Table.Row>
            // <tr key={item.id} className="bg-white border-b ">
            //     <td onClick={()=>router.push(`/splash-pages/editor?code=${item.code}`)} 
            //      className="px-6 py-4 font-medium text-primary whitespace-nowrap cursor-pointer ">
            //         {item.name}
            //     </td>
            //     <th scope="row" className="px-6 py-4  underline cursor-pointer">
            //      <a className=" font-normal whitespace-nowrap" href={item.urlSplash} target="_blank"  rel="noreferrer" 
            //      >{item.urlSplash}</a>
            //     </th>
            //     <td className="px-6 py-4">
            //         {isSplashPageActive(item.status)}
            //     </td>
            // </tr>
                )
            })}           
        </Table.Body>
    </Table>
</div>

           
        </div>
    )
}

export default SplashPagesList;