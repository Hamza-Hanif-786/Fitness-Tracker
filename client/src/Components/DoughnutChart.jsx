import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import Loading from './Loading'
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { Button } from 'primereact/button';

const DoughnutChart = () => {
    const [chartData, setChartData] = useState({});
    const { userId } = useAuth();
    const [stepsCount, setStepsCount] = useState(0);
    const [calories, setCalories] = useState(0);
    const [waterDrink, setWaterDrink] = useState(0);

    const fetchData = async () => {
        try {
            const stepsResponse = await axios.get(`http://localhost:4000/api/stepsCount/${userId}`);
            setStepsCount(stepsResponse.data.currentSteps);

            const caloriesResponse = await axios.get(`http://localhost:4000/api/caloriesBurned/${userId}`);
            setCalories(caloriesResponse.data.caloriesBurned);

            const waterIntakeResponse = await axios.get(`http://localhost:4000/api/waterIntake/${userId}`);
            setWaterDrink(waterIntakeResponse.data.waterIntake);

        } catch (error) {
          console.error('Error fetching Doughnut data:', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [userId])

    useEffect(() => {
        setChartData({
            labels: [ 'Steps Count', 'Water Intake', 'Calories Burned'],
            datasets: [
                {
                    data: [stepsCount, waterDrink, calories],
                    backgroundColor: [ '#ab87ff', '#8db580', '#FF6384'],
                    hoverBackgroundColor: [ '#ab87ff', '#8db580', '#FF6384'],
                }
            ]
        })
    }, [stepsCount, waterDrink, calories])
    
    const chartOptions = {
        cutoutPercentage: 50,
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true
                }
            }
        }
    };

    return (
        <>
            {
                chartData ? ( 
                    <div>
                        <Chart type="doughnut" data={chartData} options={chartOptions} /> 
                        <Button icon="pi pi-refresh" onClick={fetchData}/>
                    </div>
                    
                ) : ( <Loading /> )
            }
             
        </>
    )
}

export default DoughnutChart
        