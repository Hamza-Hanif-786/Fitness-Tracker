import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import Loading from './Loading'
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { Button } from 'primereact/button';

const MyPieChart = () => {
    const [chartData, setChartData] = useState({});
    const { userId } = useAuth();
    const [todoList, setTodoList] = useState([]);
    const [workoutList, setWorkoutList] = useState([]);
    const [nutritionList, setNutritionList] = useState([]);

    const fetchData = async () => {
        try {
          const todoresponse = await axios.get(`http://localhost:4000/api/todos?userId=${userId}`)
          setTodoList(todoresponse.data)
          console.log('Server Response: Frontend - Todos ', todoresponse.data);

          const workoutresponse = await axios.get(`http://localhost:4000/api/workouts?userId=${userId}`)
          setWorkoutList(workoutresponse.data)
          console.log('Server Response: Frontend - Workouts ', workoutresponse.data);

          const nutritionsresponse = await axios.get(`http://localhost:4000/api/nutritions?userId=${userId}`)
          setNutritionList(nutritionsresponse.data)
          console.log('Server Response: Frontend - Nutritions ', nutritionsresponse.data);
        } catch (error) {
          console.error('Error fetching PieChart data:', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [userId])

    useEffect(() => {
        setChartData({
            labels: [ 'Workouts', 'Nutritions', 'Tasks'],
            datasets: [
                {
                    data: [workoutList.length, nutritionList.length, todoList.length],
                    backgroundColor: [ '#4BC0C0', '#FFCE56', '#c0c5c1'],
                    hoverBackgroundColor: [ '#4BC0C0', '#FFCE56', '#c0c5c1'],
                }
            ]
        })
    }, [workoutList, nutritionList, todoList])
    
    const chartOptions = {
        cutoutPercentage: 70,
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
                        <Chart type="pie" data={chartData} options={chartOptions} /> 
                        <Button icon="pi pi-refresh" onClick={fetchData}/>
                    </div>
                    
                ) : ( <Loading /> )
            }
             
        </>
    )
}

export default MyPieChart
        