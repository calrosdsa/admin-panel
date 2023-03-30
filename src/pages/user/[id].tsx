import Layout from "@/components/layout/layout";
import UserDetail from "@/components/user/user-wifi/user-detail/UserDetail";
import UsuarioDetailTab from "@/components/user/user-wifi/user-detail/UsuarioDetailTab";
import { getDispositivos, getUserWifi } from "@/context/actions/userActions";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import useEffectOnce from "@/utils/hooks/useEffectOnce";
import { useRouter } from "next/router";


const User = () =>{
    const dispatch = useAppDispatch()
    const userState = useAppSelector(state=>state.user)
    const router = useRouter()
    const query = router.query
    const id = query.id

    useEffectOnce(()=>{
        dispatch(getUserWifi(id as string))
    })

    return(
        <Layout>
            <div className="grid lg:grid-cols-3 gap-x-3">
                <div className="border-[1px] shadow-xl rounded-xl p-2 h-[98vh]">
            {userState.user != undefined &&
            <UserDetail
            user={userState.user}
            />                    
                }
                </div>
                <div className="border-[1px] shadow-xl rounded-xl p-2 h-[98vh] col-span-2">
                    <UsuarioDetailTab
                    id={id as string}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default User;