import React from 'react'
import { Line, Pie } from '@ant-design/charts';
import './style.css'


const ChartComponent = ({sortedTransactions}) => {
const data = sortedTransactions.map((item) =>{
    return {date: item.date, amount: item.amount};
});

const spendingData= sortedTransactions.filter(
    (transaction) => {if(transaction.type == "expense"){
      return { tag:transaction.tag,amount:transaction.amount};
    }
});

let newSpending = [

    {tag: 'food',amount: 0},
    {tag: 'education',amount: 0},
    {tag: 'office',amount: 0}

];
spendingData.forEach((item)=>{
if(item.tag == 'food'){
    newSpending[0].amount += item.amount;
}else if (item.tag == 'education'){
    newSpending[1].amount += item.amount;
}else{
     newSpending[2].amount += item.amount;
}
})


  const config = {
    data:data,
    width:1000,
    autoFit:true,
    xField: 'date',
    yField: 'amount',
  };
 const spendingConfig = {
    data:newSpending,
    width:500,
    autoFit:true,
    angleField: 'amount',
    colorField: 'tag',
  };
  let chart;
  let pieChart;
  return (
    <div className='charts-wrapper'>
        <div >
        <h2>Your Analytics</h2>
        <Line {...config}
         onReady={(chartInstace) => (chart = chartInstace)} 
         />
        </div>
        <div>
        <h2>Your Spending</h2>
        <Pie {...spendingConfig}
         onReady={(chartInstace) => (pieChart = chartInstace)} 
         />
        </div>
    </div>
  )
}

export default ChartComponent