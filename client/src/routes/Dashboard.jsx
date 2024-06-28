import React from 'react'
import { GlassWater } from 'lucide-react'        
import DoughnutChart from '../Components/DoughnutChart'
import PieChart from '../Components/PieChart'
import Todo from '../Components/Todo'
import { Divider } from 'primereact/divider'
import { ProgressBar } from 'primereact/progressbar';
import CaloriesBurned from '../Components/Stats/CaloriesBurned'
import StepsCount from '../Components/Stats/StepsCount'
import WeightReview from '../Components/Stats/WeightReview'
import WaterIntake from '../Components/Stats/WaterIntake'
        

const Dashboard = () => {
  return (
    <>
      <div className="surface-ground px-4 py-5 md:px-6 lg:px-8">
        <div className="border-bottom-1 surface-border">
          <span className="block text-4xl font-bold text-900 mb-4">Dashboard</span>
        </div>        
      </div>

      
      <div className="surface-ground px-4 py-2 md:px-6 lg:px-8">
        <div className="grid">
          <div className="col-12 md:col-6 lg:col-3">
            <div className="surface-card shadow-2 p-3 border-round">
              <CaloriesBurned />
            </div>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <div className="surface-card shadow-2 p-3 border-round">
              <StepsCount />
            </div>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <div className="surface-card shadow-2 p-3 border-round">
              <WeightReview />
            </div>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <div className="surface-card shadow-2 p-3 border-round">
              <WaterIntake />
            </div>
          </div>
        </div>
      </div>
    
      <div className='surface-ground px-4 py-2 md:px-6 lg:px-8'>
        <div className="grid">
          <div className='col-12 md:col-6 lg:col-3'>
            <div className='surface-card shadow-2 p-3 border-round'>
              <DoughnutChart />
            </div>
          </div>
          <div className='col-12 md:col-6 lg:col-3'>
            <div className='surface-card shadow-2 p-3 border-round'>
              <PieChart />
            </div>
          </div>
          <div className='col-12 md:col-6 lg:col-6'>
            <div className='surface-card shadow-2 p-3 border-round'>
              <Todo />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard