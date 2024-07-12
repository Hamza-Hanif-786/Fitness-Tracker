import React, { useEffect, useState } from 'react'
import { Meals } from '../Constants'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Chip } from 'primereact/chip';
import Breakfast from '/breakfast.jpg'
import Lunch from '/lunch.jpg'
import Snacks from '/snacks.jpg'
import Dinner from '/dinner.jpg'
import axios from 'axios'
import moment from 'moment'
import { useAuth } from '@clerk/clerk-react'

const NutritionsList = () => {
  const { userId } = useAuth()
  const [nutritions, setNutritions] = useState([])
  const [myNutritions, setMyNutritions] = useState([])

  const fetchNutritions = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/nutritions?userId=${userId}`)
      setNutritions(response.data)
      setMyNutritions(response.data)
      console.log('Server Response: Frontend - Nutritions Data ', response.data);
    } catch (error) {
      console.error('Error fetching nutritions:', error);
    }
  }

  useEffect(() => {
    if (userId) {
      fetchNutritions()
    }
  }, [userId])

  const deleteNutrition = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/nutritions/${id}`)
      fetchNutritions()
    } catch (error) {
      console.error('Error deleting nutritions:', error);
    }
  }

  const handleSearch = (event) => {
    const searchQuery = event.target.value
    console.log('Search query:', searchQuery);
    setMyNutritions(myNutritions.filter(nutrition => nutrition.title.toLowerCase().includes(searchQuery.toLowerCase())))
    if (!searchQuery) {
      fetchNutritions()
    }
  }

  const filterNutritionsByCategory = (category) => {
    setMyNutritions(nutritions.filter(nutrition => nutrition.category === category));
  }

    
  return (
    <>
      <div className='flex justify-content-between align-items-center mb-3'>
        <IconField iconPosition='left'>
          <InputIcon className='pi pi-search'></InputIcon>
          <InputText placeholder='Search' type='text' className='w-30rem' onChange={handleSearch} />
        </IconField>
        <div className='flex align-items-center gap-2 justify-content-between'>
          <Chip label='Breakfast' className='cursor-pointer' onClick={() => filterNutritionsByCategory(Meals[0].title)} />
          <Chip label='Lunch' className='cursor-pointer' onClick={() => filterNutritionsByCategory(Meals[1].title)} />
          <Chip label='Snacks' className='cursor-pointer' onClick={() => filterNutritionsByCategory(Meals[2].title)} />
          <Chip label='Dinner' className='cursor-pointer' onClick={() => filterNutritionsByCategory(Meals[3].title)} />
        </div>
        <Button icon="pi pi-refresh" onClick={() => fetchNutritions()} rounded size='small'/>
      </div>
      <div className='grid'>
        {myNutritions.map((nutrition) => (
          <div className='col-12 md:col-6 lg:col-4 xl:col-3 p-3' key={nutrition._id}>
            <div className='border-round-3xl h-full shadow-2 surface-ground'>
              <img src={nutrition.category === Meals[0].title ? Breakfast : nutrition.category === Meals[1].title ? Lunch : nutrition.category === Meals[2].title ? Snacks : Dinner} alt={nutrition.category} className='w-full h-12rem border-round-top' />
              <div className='border-1 border-gray-300 border-round-3xl px-4 py-2 surface-card'>
                <div className='flex justify-content-between align-items-center'>
                  <h2 className='text-xl font-bold mb-2' style={{overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical'}}>{nutrition.title}</h2>
                </div>
                <p className='text-gray-600 mb-2'>{nutrition.category}</p>
                <p className='text-gray-600 mb-2'>Calories: {nutrition.calories}</p>
                <p className='text-gray-600 mb-2'>Protein: {nutrition.protein}</p>
                <p className='text-gray-600 mb-2'>Date: {moment(nutrition.date).format('MMMM Do YYYY')}</p>
                <p className='text-gray-600 mb-2' style={{overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '4', WebkitBoxOrient: 'vertical'}}>Notes: {nutrition.notes ? nutrition.notes : '----------'}</p>
                <Button severity='danger' icon="pi pi-trash" onClick={() => deleteNutrition(nutrition._id)} size='small' className='w-full'/>
              </div> 
            </div>   
          </div>
        ))}
        {myNutritions.length === 0 && (
          <div className='text-center text-400 font-medium text-6xl'>No Nutritions Found</div>
        )}     
      </div>
    </>
  )
}

export default NutritionsList