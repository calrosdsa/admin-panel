import DashboardData from '@/components/dashboard/DashboardData';
import LandingPage from '@/components/dashboard/LandingPage';
import Layout from '@/components/layout/layout';
import axios from 'axios'
import React, { useEffect } from "react";
import { getDataLikeForWeek, getDataLikeForWeekUserWifi } from '../context/actions/dashboardActions';
import { useAppDispatch } from '../context/reduxHooks';
import { getSettings } from '@/context/actions/authActions';

const Dashboard = () =>{
  const dispatch = useAppDispatch()
  
  useEffect(()=>{
    dispatch(getSettings())
    dispatch(getDataLikeForWeek())
    dispatch(getDataLikeForWeekUserWifi())

     // eslint-disable-line react-hooks/exhaustive-deps
},[])
  return(
    <Layout>
      <div className={`relative lg:grid bg-gray-100  lg:grid-cols-2 w-full xl:h-screen`}>
        <DashboardData/>
        <div className='lg:h-screen lg:overflow-y-auto'>
      <LandingPage/>
        </div>
        </div>
    </Layout>   
  )
}

export default Dashboard;