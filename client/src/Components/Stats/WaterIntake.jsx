import React, { useState, useEffect, useRef } from 'react'
import { GlassWater } from 'lucide-react'
import { Divider } from 'primereact/divider'
import { ProgressBar } from 'primereact/progressbar'
import { Button } from 'primereact/button'
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react' 

const WaterIntake = () => {
    const op = useRef(null);
    const { userId } = useAuth();
    const [waterDrink, setWaterDrink] = useState({
        dailyGoal: 4000,
        waterIntake: 0,
        userId: userId
    });

    const fetchWaterIntake = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/waterIntake/${userId}`);
            setWaterDrink({
                ...response.data,
                userId: userId
            });
        } catch (error) {
            console.error('Error fetching water data:', error);
        }
    }

    useEffect(() => {
        if(userId){
            fetchWaterIntake();
        }
    }, [userId])

    const handleDailyGoalChange = async (value) => {
        try {
            const response = await axios.patch(`http://localhost:4000/api/waterIntake/${waterDrink._id}`, { dailyGoal: value });
            setWaterDrink(response.data);
        } catch (error) {
            console.error('Error updating daily goal:', error); 
        }
    }

    const handleWaterIntakeChange = async (value) => {
        try {
          const response = await axios.patch(`http://localhost:4000/api/waterIntake/${waterDrink._id}`, { waterIntake: value });
          setWaterDrink(response.data); 
        } catch (error) {
          console.error('Error updating water intake:', error);
        }
    };

  return (
    <>
        <div className="flex justify-content-between mb-3">
            <div>
                <span className="block text-500 font-medium mb-3">Water Intake</span>
                <div className="text-900 font-medium text-xl">{waterDrink.waterIntake} mL</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <GlassWater className='text-blue-500 text-xl' />
            </div>
        </div>

        <Divider />

        <div className="flex justify-content-between align-items-center">
            <span className="text-600 text-sm font-semibold">Daily Goal</span>
            <span className="text-900 font-medium text-sm">{(waterDrink.waterIntake / waterDrink.dailyGoal * 100).toFixed(0)}%</span>
        </div>

        <ProgressBar value={(waterDrink.waterIntake / waterDrink.dailyGoal * 100).toFixed(0)} showValue={false} className="mt-2 mb-3" style={{ height: '0.5rem' }} ></ProgressBar>

        <div className='flex justify-content-between align-items-center'>
            <span className="text-700 font-medium text-sm">Goal: {waterDrink.dailyGoal} mL</span>
            <Button icon="pi pi-ellipsis-v" rounded text onClick={(e) => op.current.toggle(e)} />
            <OverlayPanel ref={op} className='p-2'>
                <div className='flex flex-column gap-2'>
                    <div className='flex flex-column gap-2'>
                        Water Drink: {waterDrink.waterIntake}
                        <InputNumber value={waterDrink.waterIntake} onValueChange={(e) => handleWaterIntakeChange(e.value)} mode="decimal" showButtons step={100} min={0} max={waterDrink.dailyGoal}/>
                    </div>

                    <div className='flex flex-column gap-2'>
                        Daily Goal: {waterDrink.dailyGoal}
                        <InputNumber value={waterDrink.dailyGoal} onValueChange={(e) => handleDailyGoalChange(e.value)} mode="decimal" showButtons step={100} min={0} max={4000}/>
                    </div>
                </div>
            </OverlayPanel>
        </div>
        
    </>
  )
}

export default WaterIntake