import React from 'react'
import WorkoutForm from '../Components/WorkoutForm'
import WorkoutsList from '../Components/WorkoutsList'

const Workout = () => {
  return (
    <>
      <div className="surface-ground px-4 py-5 md:px-6 lg:px-8">
        <div className="border-bottom-1 surface-border">
          <span className="block text-4xl font-bold text-900 mb-4">Workouts</span>
        </div>        
      </div>

      <div className='surface-ground px-4 py-2 md:px-6 lg:px-8'>
        <div className="grid">
          <div className='col-12 md:col-6'>
            <div className='surface-card border-round shadow-2 p-4'>
              <WorkoutForm />
            </div>
          </div>
          <div className='col-12 md:col-6'>
            <div className='surface-card border-round shadow-2 p-4'>
              <WorkoutsList />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Workout