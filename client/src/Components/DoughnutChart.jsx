import React, { useState, useEffect, Suspense } from 'react'
import { Chart } from 'primereact/chart';

function DoughnutChart() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
  
    useEffect(() => {
      setChartData({
        labels: ['Calories', 'Steps'],
        datasets: [
          {
            data: [300, 100],
            backgroundColor: [
              "#FF6384",
              "#36A2EB"
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB"
            ]
          }
        ]
      });
  
      setChartOptions({
        cutoutPercentage: 70,
      });
    }, []);
  
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Chart type="doughnut" data={chartData} options={chartOptions} />
      </Suspense>
    </>
  )
}

export default DoughnutChart