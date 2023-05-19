import Image from "next/image";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../context/reduxHooks";
import { uiActions } from "../context/slices/ui-slice";
import { useRouter } from "next/router";
import LineChartConnectNulls from "@/components/dashboard/charts/LineChartConnectNulls";
import Layout from "@/components/layout/layout";
import { GenderChart } from "@/components/dashboard/charts/GenderChart";
import AgeChart from "@/components/dashboard/charts/AgeChart";
import CommonBarChart from "@/components/dashboard/charts/CommonBarChart";
import CommonPieChart from "@/components/dashboard/charts/CommonPieChart";

const data1 = [
  { name: "Masculino", pv: 24 },
  { name: "Femenino", pv: 15 },
  { name: "Sin definir", pv: 32 },
  { name: "No binario", pv: 4 },
  
];
const data = [
  {
    name: 'Nuevos',
    pv: 4000,
  },
  {
    name: 'Repetidos',
    pv: 3000,
  },
];
const data3 = [
  {
    name: '00:00',
    pv: 2400,
  },
  {
    name: '02:00',
    pv: 1398,
  },
  {
    name: '04:00',
    pv: 4800,
  },
  {
    name: '06:00',
    pv: 3908,
  },
  {
    name: '08:00',
    pv: 4800,
  },
  {
    name: '10:00',
    pv: 3800,
  },
  {
  name: '12:00',
  pv: 3800,
  },
  {
    name: '14:00',
    pv: 4800,
  },
  {
    name: '16:00',
    pv: 3800,
  },
  {
  name: '18:00',
  pv: 1500,
  },
  {
    name: '20:00',
    pv: 5800,
  },
  {
  name: '22:00',
  pv: 3800,
  },
 
];
export default function Home() {
  const uiState = useAppSelector(state=>state.ui)
  const dispatch = useAppDispatch()
  const router = useRouter()
 
  useEffect(()=>{
    dispatch(uiActions.setInitAnimation(false))
    // setTimeout(()=>{
    //   router.push('./dashboard')
    // },500)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <Layout>  
            <div className="flex flex-col lg:grid  lg:grid-cols-6 py-3 gap-3 pt-16 xl:pt-2 pb-40">
              <div className='relative col-start-1 col-span-2 border-[1px] border-gray-500 rounded-lg p-2'>
              <div className='flex justify-between pb-4'>
                <div className="grid">
                    <span className='title'>Visitors Online Now</span>
                    <span className=" text-xs">Last refreshed: 08:34 09/05/2023</span>
                </div>
                <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-8 h-8 button2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                  </button>
                </div>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl text-gray-400 font-semibold">120</span>
              </div>
            <LineChartConnectNulls
            title="Visit count"
            subtitle="Total visits for the last 30 days"
            />
                <GenderChart
                data={data1} xKey="name" yKey="pv"
                title="Gender"
                subtitle="Total visitors for the last 30 days"
                />

            <AgeChart
            title="Age"
            subtitle="Total visits for the last 30 days"
            />


        <div className='col-start-1 col-span-2 border-[1px] border-gray-500 rounded-lg p-2'>
                <div className='grid pb-4'>
                    <span className='title'>New vs repeat</span>
                    <span className=" text-xs">Total visitors for the last 30 days</span>
                </div>
                <CommonBarChart data={data}/>
        </div>

        <div className='col-start-3 col-span-2 border-[1px] border-gray-500 rounded-lg p-2'>
                <div className='grid pb-4'>
                    <span className='title'>Connection method</span>
                    <span className=" text-xs">Total visitors for the last 30 days</span>
                </div>
                <CommonPieChart/>
        </div>

        <div className='col-start-5 col-span-2 border-[1px] border-gray-500 rounded-lg p-2'>
                <div className='grid pb-4'>
                    <span className='title'>Hour of day</span>
                    <span className=" text-xs">Total visitors for the last 30 days</span>
                </div>
                <CommonBarChart data={data3}
                angle={310}
                minTickGap={-25}
                fontSize={12}
                marginBottom={25}
                tickMargin={20}
                />
        </div>
            </div>
      </Layout>
  );
};


//https://76.76.21.241/?cmd=login&mac=ac:12:03:9c:ae:05&essid=radius&ip=172.31.98.4&apname=40%3Ae3%3Ad6%3Acc%3A62%3Aa8&apmac=40%3Ae3%3Ad6%3Acc%3A62%3Aa8&vcname=SetMeUp-CC%3A62%3AA8&switchip=securelogin.arubanetworks.com&url=http%3A%2F%2Fwww.msftconnecttest.com%2Fredirect

//https://community.arubanetworks.com/community-home/digestviewer/viewthread?MID=16648#bmbd935f86-6b5b-4ee5-9a0d-33b606b01d67

//https://login.webhook-murex.vercel.app/swarm.cgi