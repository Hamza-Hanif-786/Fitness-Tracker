import { Flame } from 'lucide-react'
import { Divider } from 'primereact/divider'
import { ProgressBar } from 'primereact/progressbar'
import React from 'react'

const CaloriesBurned = () => {
  return (
    <>
        <div className="flex justify-content-between mb-3">
            <div>
                <span className="block text-500 font-medium mb-3">Calories Burned</span>
                <div className="text-900 font-medium text-xl">152</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <Flame className='text-orange-500 text-xl' />                  
            </div>
        </div>

        <Divider />

        <div className="flex justify-content-between align-items-center">
            <span className="text-600 text-sm font-semibold">Monthly Goal</span>
            <span className="text-900 font-medium text-sm">40%</span>
        </div>

        <ProgressBar value={40} showValue={false} className="mt-2 mb-3" style={{ height: '0.5rem' }} color="orange" ></ProgressBar>

        <span className="text-700 font-medium text-sm">1500 Calories</span>
    </>
  )
}

export default CaloriesBurned