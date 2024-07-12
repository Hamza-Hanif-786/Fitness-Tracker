import React, { Suspense} from 'react'
import WorkoutForm from '../Components/WorkoutForm'
import WorkoutsList from '../Components/WorkoutsList'
import Loading from '../Components/Loading'
import { Divider } from 'primereact/divider'

const Workout = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="surface-ground px-4 py-5 md:px-6 lg:px-8">
          <div className="flex flex-row justify-content-between align-items-center">
            <span className="block text-4xl font-bold text-900 mb-4">Workouts</span>
            <WorkoutForm />
          </div> 
          <Divider />       
        </div>

        <div className='surface-ground px-4 py-2 md:px-6 lg:px-8'>
          <div className='surface-card border-round shadow-2 p-4'>
            <WorkoutsList />
          </div>
        </div>
      </Suspense>
    </>
  )
}

export default Workout