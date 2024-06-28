import { GlassWater } from 'lucide-react'
import { Divider } from 'primereact/divider'
import { ProgressBar } from 'primereact/progressbar'
import React from 'react'

const WaterIntake = () => {
  return (
    <>
        <div className="flex justify-content-between mb-3">
            <div>
                <span className="block text-500 font-medium mb-3">Water Intake</span>
                <div className="text-900 font-medium text-xl">4 Litre's</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <GlassWater className='text-blue-500 text-xl' />
            </div>
        </div>

        <Divider />

        <div className="flex justify-content-between align-items-center">
            <span className="text-600 text-sm font-semibold">Daily Goal</span>
            <span className="text-900 font-medium text-sm">50%</span>
        </div>

        <ProgressBar value={50} showValue={false} className="mt-2 mb-3" style={{ height: '0.5rem' }} ></ProgressBar>

        <span className="text-700 font-medium text-sm">40 Litre</span>
    </>
  )
}

export default WaterIntake