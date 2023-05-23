import { LikeData } from '@/data/models/redux-models/dashboard-model';
import React, { PureComponent } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, Tooltip, Legend, YAxis, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from './CustomToolTip';

interface Props {
  dataLike:undefined | any[]
}
const LikeWeekChart =  ({
 dataLike
}:Props)=>  {
  // static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

    return (
      <ResponsiveContainer width="100%" height={300}>
      <BarChart data={dataLike}  margin={{
        top: 20,
        right: 20,
        left: 20,
      }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" />
      <YAxis />
      <Tooltip content={<CustomTooltip active={false} payload={undefined} label={undefined}/>} />
      {/* <Legend /> */}
      <Bar dataKey="y" fill="#8884d8" barSize={40} label={{ position: 'top' }}/>
      {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
    </BarChart>
      </ResponsiveContainer>
    );
  }

export default LikeWeekChart;


// import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLine, VictoryTooltip } from "victory";
// import { LikeData } from "../../../data/models/redux-models/dashboard-model";
// import useEffectOnce from "../../../utils/hooks/useEffectOnce";
// import {useEffect} from 'react'

// interface Props {
//     data:LikeData[]
// }
// const LikeWeekChart = ({data}:Props) =>{
//     // const likes = [{"x":"2023-01-20","y":1758},{"x":"2023-01-21","y":1783},
//     // {"x":"2023-01-22","y":2199},{"x":"2023-01-23","y":1296},
//     // {"x":"2023-01-24","y":1654},
//     // {"x":"2023-01-25","y":2425},{"x":"2023-01-26","y":2000}]
    

//     return(
//         <div  className="bg-white">
//         <VictoryChart
//         // events={[
//         //   {
//         //     target:"parent",
//         //     eventHandlers:{
//         //       onClick:()=>{
//         //         // console.log(window.hei)
//         //         const el = document.querySelector('#dash')?.getBoundingClientRect().top // Y
//         //         var height = document.documentElement.clientHeight;
//         //         console.log(height)
//         //         if(el != undefined){
//         //           // window.scrollY + el
//         //           window.scroll(0,el + 80)
//         //         }
//         //         console.log(el)
//         //         // window.scroll({
//         //         //   top: 100,
//         //         //   behavior: 'smooth'
//         //         // });
//         //         return 
//         //       }
//         //     }
//         //   }
//         // ]}
//         // padding={38}
//       domainPadding={{x: 25, y: 20}}
//         >
//             <VictoryAxis
//             // tickFormat={(x) => `${x} likes`}
//             dependentAxis={true}
//             style={{
//               grid: { stroke: "grey" },tickLabels:{fontSize:10}
//             }}
//           />
//           <VictoryAxis 
//             // tickFormat={(x) => ``}
//             style={{
//               tickLabels:{fontSize:10}
//             }}
//             labelComponent={
//                 //   <VictoryTooltip/>
//                   <VictoryLabel  dy={-5} angle={340}/>
//             }
//           />
//           <VictoryBar
          
//            labelComponent={<VictoryTooltip/>}
//         //    labelComponent={<VictoryLabel angle={270} dy={10}/>}
//           data={data}
//           style={{
//             data: {fill: "tomato", width: 20}
//           }}
//           labels={({datum}) => `${datum.y} likes`}

//           />
//         {/* <VictoryLine
//             data={data}
//             labels={({datum}) => datum.x}
//       padding={{bottom: 20, left: 5, right: 5 ,top:10}}
//       labelComponent={
//         //   <VictoryTooltip/>
//           <VictoryLabel  dy={-5} angle={340}/>
//     }
//     // labelComponent={ <VictoryLabel  dy={-5} angle={340}/>}
//       style={{ labels: {fontSize: 10,fill:'#0406ee',fontWeight:'bold'} }}
//             /> */}
//         </VictoryChart>
//         </div>
//     )
// }

// export default LikeWeekChart;