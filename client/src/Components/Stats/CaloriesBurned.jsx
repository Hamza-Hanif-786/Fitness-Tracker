import React, { useState, useEffect, useRef } from 'react'
import { Flame } from 'lucide-react'
import { Divider } from 'primereact/divider'
import { ProgressBar } from 'primereact/progressbar'
import { Button } from 'primereact/button'
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react' 

const CaloriesBurned = () => {
    const op = useRef(null);
    const { userId } = useAuth();
    const [caloryBurned, setCaloryBurned] = useState({
        dailyGoal: 5000,
        caloriesBurned: 0,
        userId: userId
    });

    const fetchCaloriesBurned = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/caloriesBurned/${userId}`);
            setCaloryBurned({
                ...response.data,
                userId: userId
            });
        } catch (error) {
            console.error('Error fetching calories burned data:', error);
        }
    }

    useEffect(() => {
        if(userId){
            fetchCaloriesBurned();
        }
    }, [userId])

    const handleDailyGoalChange = async (value) => {
        try {
            const response = await axios.patch(`http://localhost:4000/api/caloriesBurned/${caloryBurned._id}`, { dailyGoal: value });
            setCaloryBurned(response.data);
        } catch (error) {
            console.error('Error updating daily goal:', error); 
        }
    }

    const handleStepsChange = async (value) => {
        try {
          const response = await axios.patch(`http://localhost:4000/api/caloriesBurned/${caloryBurned._id}`, { caloriesBurned: value });
          setCaloryBurned(response.data); 
        } catch (error) {
          console.error('Error updating calories burned:', error);
        }
    };

  return (
    <>
        <div className="flex justify-content-between mb-3">
            <div>
                <span className="block text-500 font-medium mb-3">Calories Burned</span>
                <div className="text-900 font-medium text-xl">{caloryBurned.caloriesBurned}</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <Flame className='text-orange-500 text-xl' />                  
            </div>
        </div>

        <Divider />

        <div className="flex justify-content-between align-items-center">
            <span className="text-600 text-sm font-semibold">Daily Goal</span>
            <span className="text-900 font-medium text-sm">{(caloryBurned.caloriesBurned / caloryBurned.dailyGoal * 100).toFixed(0)} %</span>
        </div>

        <ProgressBar value={(caloryBurned.caloriesBurned / caloryBurned.dailyGoal * 100).toFixed(0)} showValue={false} className="mt-2 mb-3" style={{ height: '0.5rem' }} color="orange" ></ProgressBar>

        <div className='flex justify-content-between align-items-center'>
            <span className="text-700 font-medium text-sm">Goal: {caloryBurned.dailyGoal} Calories</span>
            <Button icon="pi pi-ellipsis-v" rounded text onClick={(e) => op.current.toggle(e)} />
            <OverlayPanel ref={op} className="p-2">
                <div className='flex flex-column gap-2'>
                    <div className='flex flex-column gap-2'>
                        Calories Burned: {caloryBurned.caloriesBurned}
                        <InputNumber value={caloryBurned.caloriesBurned} onValueChange={(e) => handleStepsChange(e.value)} mode="decimal" showButtons min={0} max={caloryBurned.dailyGoal}/>
                    </div>

                    <div className='flex flex-column gap-2'>
                        Daily Goal: {caloryBurned.dailyGoal}
                        <InputNumber value={caloryBurned.dailyGoal} onValueChange={(e) => handleDailyGoalChange(e.value)} mode="decimal" showButtons min={0} max={5000}/>
                    </div>
                </div>
                
            </OverlayPanel>
        </div>
    </>
  )
}

export default CaloriesBurned