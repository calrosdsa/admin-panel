"use client"
import DashboardData from '@/components/dashboard/DashboardData';
import LandingPage from '@/components/dashboard/LandingPage';
import Layout from '@/components/layout/layout';
import axios from 'axios'
import React, { useEffect } from "react";
import { getSettings } from '@/context/actions/authActions';
import { useAppDispatch } from '@/context/reduxHooks';
import { getDataLikeForWeek, getDataLikeForWeekUserWifi } from '@/context/actions/dashboardActions';

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
      <div className={` lg:grid bg-gray-100  lg:grid-cols-2 w-full xl:h-screen `}>
        <DashboardData/>
        <div className='lg:h-screen lg:overflow-y-auto'>
      <LandingPage/>
        </div>
        </div>
    </Layout>   
  )
}

export default Dashboard;