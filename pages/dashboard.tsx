import axios from 'axios'
import React, { useEffect } from "react";
import DashboardData from '../components/dashboard/DashboardData';
import LandingPage from '../components/dashboard/LandingPage';
import Layout from '../components/layout/Layout';
import { getDataLikeForWeek, getDataLikeForWeekUserWifi } from '../context/actions/dashboardActions';
import { useAppDispatch } from '../context/reduxHooks';

const Dashboard = () =>{
  const dispatch = useAppDispatch()
  
  useEffect(()=>{
    dispatch(getDataLikeForWeek())
    dispatch(getDataLikeForWeekUserWifi())

     // eslint-disable-line react-hooks/exhaustive-deps
},[])
  return(
    <Layout title="Panel Admin">
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