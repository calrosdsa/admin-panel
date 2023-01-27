import axios from 'axios'
import React, { useEffect } from "react";
import DashboardData from '../components/dashboard/DashboardData';
import LandingPage from '../components/dashboard/LandingPage';
import Layout from '../components/layout/Layout';
import { getDataLikeForWeek } from '../context/actions/dashboardActions';
import { useAppDispatch } from '../context/reduxHooks';

const Dashboard = () =>{
  const dispatch = useAppDispatch()
  
  useEffect(()=>{
    dispatch(getDataLikeForWeek())
},[])
    return(
        <Layout title="Panel Admin">
      <div className={`relative grid grid-cols-2  w-full`}>
        <DashboardData/>
        <div className='h-screen overflow-y-auto'>
      <LandingPage/>
        </div>
        </div>
        </Layout>   
    )
}

export default Dashboard;