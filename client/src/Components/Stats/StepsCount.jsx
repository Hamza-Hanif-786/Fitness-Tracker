import React, { useState, useEffect, useRef } from 'react'
import { Footprints } from 'lucide-react'
import { Divider } from 'primereact/divider'
import { ProgressBar } from 'primereact/progressbar'
import { Button } from 'primereact/button'
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react'        

const StepsCount = () => {
    const op = useRef(null);
    const { userId } = useAuth();
    const [stepsCount, setStepsCount] = useState({
        dailyGoal: 10000,
        currentSteps: 0,
        userId: userId
    });

    const fetchStepCount = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/stepsCount/${userId}`);
            setStepsCount({
                ...response.data,
                userId: userId
            });
        } catch (error) {
            console.error('Error fetching step count data:', error);
        }
    }

    useEffect(() => {
        if(userId){
            fetchStepCount();
        }
    }, [userId])

    const handleDailyGoalChange = async (value) => {
        try {
            const response = await axios.patch(`http://localhost:4000/api/stepsCount/${stepsCount._id}`, { dailyGoal: value });
            setStepsCount(response.data);
        } catch (error) {
            console.error('Error updating daily goal:', error); 
        }
    }

    const handleStepsChange = async (value) => {
        try {
          const response = await axios.patch(`http://localhost:4000/api/stepsCount/${stepsCount._id}`, { currentSteps: value });
          setStepsCount(response.data); 
        } catch (error) {
          console.error('Error updating current steps:', error);
        }
    };

  return (
    <>
        <div className="flex justify-content-between mb-3">
            <div>
                <span className="block text-500 font-medium mb-3">Steps Count</span>  
                <div className="text-900 font-medium text-xl">{stepsCount.currentSteps}</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <Footprints  className='text-green-500 text-xl'/>
            </div>
        </div>

        <Divider />

        <div className="flex justify-content-between align-items-center">
            <span className="text-600 text-sm font-semibold">Daily Goal</span>
            <span className="text-900 font-medium text-sm">{(stepsCount.currentSteps / stepsCount.dailyGoal * 100).toFixed(0)}%</span>
        </div>

        <ProgressBar value={(stepsCount.currentSteps / stepsCount.dailyGoal * 100).toFixed(0)} showValue={false} className="mt-2 mb-3" style={{ height: '0.5rem' }} color='limegreen' ></ProgressBar>

        <div className='flex justify-content-between align-items-center'>
            <span className="text-700 font-medium text-sm">Goal: {stepsCount.dailyGoal} Steps</span>
            <Button icon="pi pi-ellipsis-v" rounded text onClick={(e) => op.current.toggle(e)} />
            <OverlayPanel ref={op} className='p-2'>
                <div className='flex flex-column gap-2'>
                    <div className='flex flex-column gap-2'>
                        Current Steps: {stepsCount.currentSteps}
                        <InputNumber value={stepsCount.currentSteps} onValueChange={(e) => handleStepsChange(e.value)} showButtons min={0} max={stepsCount.dailyGoal} />
                    </div>
                    <div className='flex flex-column gap-2'>
                        Daily Goal: {stepsCount.dailyGoal}
                        <InputNumber value={stepsCount.dailyGoal} onValueChange={(e) => handleDailyGoalChange(e.value)} showButtons min={1000} max={10000} />
                    </div>
                </div>
            </OverlayPanel>
        </div>
        

    </>
  )
}

export default StepsCount