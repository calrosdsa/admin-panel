import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine } from "victory";
import { LikeData } from "../../../data/models/redux-models/dashboard-model";
import useEffectOnce from "../../../utils/hooks/useEffectOnce";
import {useEffect} from 'react'

interface Props {
    data:LikeData[]
}
const LikeWeekChart = ({data}:Props) =>{
    // const likes = [{"x":"2023-01-20","y":1758},{"x":"2023-01-21","y":1783},
    // {"x":"2023-01-22","y":2199},{"x":"2023-01-23","y":1296},
    // {"x":"2023-01-24","y":1654},
    // {"x":"2023-01-25","y":2425},{"x":"2023-01-26","y":2000}]
    

    return(
        <div className="">
        <VictoryChart
        padding={38}
      domainPadding={{x: 25, y: 20}}
        >
            <VictoryAxis
            dependentAxis={true}
            style={{
              grid: { stroke: "grey" },tickLabels:{fontSize:10}
            }}
          />
          <VictoryAxis 
            tickFormat={(x) => ``}
          />
        <VictoryLine
            data={data}
            labels={({datum}) => datum.x}
      padding={{bottom: 20, left: 5, right: 5 ,top:10}}
      labelComponent={<VictoryLabel  dy={-5} angle={340}/>}
      style={{ labels: {fontSize: 10,fill:'#0406ee',fontWeight:'bold'} }}
            />
        </VictoryChart>
        </div>
    )
}

export default LikeWeekChart;