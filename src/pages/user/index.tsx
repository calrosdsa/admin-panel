import DashboardData2 from "@/components/dashboard/DashboardData2";
import Layout from "@/components/layout/layout";
import TableUserWifi from "@/components/user/user-wifi/TableUserWifi";
import { getUserList } from "@/context/actions/userActions";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import { useEffect } from "react";
import { FallingLines } from "react-loader-spinner";


const Users = () =>{
    const userState = useAppSelector(state=>state.user)
    const uiState = useAppSelector(state=>state.ui)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        if(userState.users.length == 0){
            dispatch(getUserList())
        }
    },[])
    return(

        <Layout>
            <div className="xl:pt-4 ">
                <DashboardData2/>
            {uiState.innerLoading ?
      <div className='grid place-content-center w-full h-[50vh]'>
          <FallingLines
          color="#0406ee"
          width="110"
          visible={true}
          // ariaLabel='falling-lines-loading'
          />
          </div>
          :
              <TableUserWifi
              users={userState.users}
              ids={userState.ids}
              />
               }
            </div>
        </Layout>
    )
}

export default Users;