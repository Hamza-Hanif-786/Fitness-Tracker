import React, { useEffect, useState, useRef } from 'react'
import { useAuth } from '@clerk/clerk-react'
import StrenghtTraining from '/strength_training.svg'
import Cardio from '/cardio.svg'
import FlexibilityYoga from '/flexibility_yoga.svg'
import { Workouts } from '../Constants'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Chip } from 'primereact/chip';
import moment from 'moment'
import axios from 'axios'

const WorkoutsList = () => {
  const { userId } = useAuth()
  const [workouts, setWorkouts] = useState([])
  const [myWorkouts, setMyWorkouts] = useState([])

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/workouts?userId=${userId}`)
      setWorkouts(response.data)
      setMyWorkouts(response.data)
      console.log('Server Response: Frontend - Workouts Data ', response.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  }

  useEffect(() => {
    if (userId) {
      fetchWorkouts()
    }
  }, [userId])

  const deleteWorkout = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/workouts/${id}`)
      fetchWorkouts()
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  }

  const handleSearch = (event) => {
    const searchQuery = event.target.value
    console.log('Search query:', searchQuery);
    setMyWorkouts(myWorkouts.filter(workout => workout.title.toLowerCase().includes(searchQuery.toLowerCase())))
    if (!searchQuery) {
      fetchWorkouts()
    }
  }

  const filterWorkoutsByCategory = (category) => {
    setMyWorkouts(workouts.filter(workout => workout.category === category));
  }


    
  return (
    <>
      <div className='flex justify-content-between align-items-center mb-3'>
        <IconField iconPosition='left'>
          <InputIcon className='pi pi-search'></InputIcon>
          <InputText placeholder='Search' type='text' className='w-30rem' onChange={handleSearch} />
        </IconField>
        <div className='flex align-items-center gap-2 justify-content-between'>
          <Chip label='Strength Training' icon="pi pi-fw pi-heart" className='cursor-pointer' onClick={() => filterWorkoutsByCategory(Workouts[0].title)} />
          <Chip label='Cardio' icon="pi pi-fw pi-calendar" className='cursor-pointer' onClick={() => filterWorkoutsByCategory(Workouts[1].title)} />
          <Chip label='Flexibility / Yoga' icon="pi pi-fw pi-star-fill" className='cursor-pointer' onClick={() => filterWorkoutsByCategory(Workouts[2].title)} />
        </div>
        <Button icon="pi pi-refresh" onClick={() => fetchWorkouts()} rounded size='small'/>
      </div>
      <div className='grid'>
        {myWorkouts.map((workout) => (
          <div className='col-12 md:col-6 lg:col-4 xl:col-3 p-3' key={workout._id}>
            <div className='border-round-3xl h-full shadow-2 surface-ground'>
              <img src={workout.category === Workouts[0].title ? StrenghtTraining : workout.category === Workouts[1].title ? Cardio : FlexibilityYoga} alt={workout.category} className='w-full h-10rem border-round-top' />
              <div className='border-1 border-gray-300 border-round-3xl px-4 py-2 surface-card'>
                <h2 className='text-2xl font-bold mb-2' style={{overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical'}}>{workout.title}</h2>
                <p className='text-gray-600 mb-2'>{workout.category}</p>
                <p className='text-gray-600 mb-2'>Reps: {workout.reps}</p>
                <p className='text-gray-600 mb-2'>Sets: {workout.sets}</p>
                <p className='text-gray-600 mb-2'>Date: {moment(workout.date).format('MMMM Do YYYY')}</p>
                <p className='text-gray-600 mb-2' style={{overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '4', WebkitBoxOrient: 'vertical'}}>Notes: {workout.notes ? workout.notes : '----------'}</p>
                <Button severity='danger' icon="pi pi-trash" onClick={() => deleteWorkout(workout._id)} size='small' className='w-full'/>
              </div> 
            </div>   
          </div>
        ))}
        {myWorkouts.length === 0 && (
          <div className='text-center text-400 font-medium text-6xl'>No Workouts Found</div>
        )}    
      </div>
    </>
  )
}

export default WorkoutsList