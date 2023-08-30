"use client"
import Layout from "@/components/layout/layout";
import UserDetail from "@/components/user/user-wifi/user-detail/UserDetail";
import UsuarioDetailTab from "@/components/user/user-wifi/user-detail/UsuarioDetailTab";
import { getDispositivos, getUserWifi } from "@/context/actions/userActions";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import useEffectOnce from "@/utils/hooks/useEffectOnce";
import { useRouter } from "next/navigation";


const User = ({ params }: { params: { id: string } }) =>{
    const dispatch = useAppDispatch()
    const userState = useAppSelector(state=>state.user)
    const router = useRouter()

    useEffectOnce(()=>{
        dispatch(getUserWifi(params.id as string))
    })

    return(
        <Layout>
            <div className="">
                <div className=" xl:grid xl:grid-cols-3  pt-10 xl:pt-0 max-w-xl mx-auto xl:max-w-6xl bg-white">
                <div className="border-[1px] shadow-xl p-2  m-auto xl:h-screen w-full h-96" >
            <UserDetail
            user={userState.user}
            />                    
                </div>
                <div className="border-[1px] shadow-xl mt-10 lg:mt-0 p-2 col-span-2 h-screen overflow-auto">
                    <UsuarioDetailTab
                    id={params.id as string}
                    />
                </div>
            </div>
        </div>
        </Layout>
    )
}

export default User;