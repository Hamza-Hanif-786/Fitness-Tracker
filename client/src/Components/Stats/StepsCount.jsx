import { Footprints } from 'lucide-react'
import { Divider } from 'primereact/divider'
import { ProgressBar } from 'primereact/progressbar'
import React from 'react'

const StepsCount = () => {
  return (
    <>
        <div className="flex justify-content-between mb-3">
            <div>
                <span className="block text-500 font-medium mb-3">Steps Count</span>  
                <div className="text-900 font-medium text-xl">2100</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                <Footprints  className='text-green-500 text-xl'/>
            </div>
        </div>

        <Divider />

        <div className="flex justify-content-between align-items-center">
            <span className="text-600 text-sm font-semibold">Daily Goal</span>
            <span className="text-900 font-medium text-sm">70%</span>
        </div>

        <ProgressBar value={70} showValue={false} className="mt-2 mb-3" style={{ height: '0.5rem' }} color='limegreen' ></ProgressBar>

        <span className="text-700 font-medium text-sm">2200 Steps</span>

    </>
  )
}

export default StepsCount