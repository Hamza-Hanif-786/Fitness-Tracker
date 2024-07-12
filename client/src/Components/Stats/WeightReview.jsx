import React, { useState, useEffect, useRef } from 'react'
import { Weight } from 'lucide-react'
import { Divider } from 'primereact/divider'
import { ProgressBar } from 'primereact/progressbar'
import { Button } from 'primereact/button'
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react'

const WeightReview = () => {
    const op = useRef(null);
    const { userId } = useAuth();
    const [weightGoal, setWeightGoal] = useState({
        targetWeight: 0,
        currentWeight: 0,
        userId: userId
    });

    const fetchWeightGoal = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/weightGoal/${userId}`);
            setWeightGoal({
                ...response.data,
                userId: userId
            });
        } catch (error) {
            console.error('Error fetching weight goal data:', error);
        }
    }

    useEffect(() => {
        if(userId){
            fetchWeightGoal();
        }
    }, [userId])

    const handleTargetWeightChange = async (value) => {
        try {
            const response = await axios.patch(`http://localhost:4000/api/weightGoal/${weightGoal._id}`, { targetWeight: value });
            setWeightGoal(response.data);
        } catch (error) {
            console.error('Error updating target weight:', error); 
        }
    }

    const handleCurrentWeightChange = async (value) => {
        try {
          const response = await axios.patch(`http://localhost:4000/api/weightGoal/${weightGoal._id}`, { currentWeight: value });
          setWeightGoal(response.data); 
        } catch (error) {
          console.error('Error updating current weight:', error);
        }
    };

  return (
    <>
        <div className="flex justify-content-between mb-3">
            <div>
                <span className="block text-500 font-medium mb-3">Weight</span>
                <div className="text-900 font-medium text-xl">{weightGoal.currentWeight} Kg</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-orange-200 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <Weight className='text-orange-900 text-xl' />
            </div>
        </div>

        <Divider />

        <div className="flex justify-content-between align-items-center">
            <span className="text-600 text-sm font-semibold">Monthly Goal</span>
            <span className="text-900 font-medium text-sm">{(weightGoal.targetWeight / weightGoal.currentWeight * 100).toFixed(0)} %</span>
        </div>

        <ProgressBar value={(weightGoal.targetWeight / weightGoal.currentWeight * 100).toFixed(0)} showValue={false} className="mt-2 mb-3" style={{ height: '0.5rem' }} color="brown" ></ProgressBar>

        <div className='flex justify-content-between align-items-center'>
            <span className="text-700 font-medium text-sm">Goal: {weightGoal.targetWeight} K.g</span>
            <Button icon="pi pi-ellipsis-v" rounded text onClick={(e) => op.current.toggle(e)} />
            <OverlayPanel ref={op} className='p-2'>
                <div className='flex flex-column gap-2'>
                    <div className='flex flex-column gap-2'>
                        Current Weight: {weightGoal.currentWeight} Kg
                        <InputNumber value={weightGoal.currentWeight} onValueChange={(e) => handleCurrentWeightChange(e.value)} mode="decimal" showButtons min={0} max={300}/>
                    </div>
                    <div className='flex flex-column gap-2'>
                        Target Weight: {weightGoal.targetWeight} Kg
                        <InputNumber value={weightGoal.targetWeight} onValueChange={(e) => handleTargetWeightChange(e.value)} mode="decimal" showButtons min={0} max={100}/>
                    </div>
                </div>
            </OverlayPanel>
        </div>
    </>
  )
}

export default WeightReview