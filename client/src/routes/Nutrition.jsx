import React from 'react'
import NutritionsList from '../Components/NutritionsList'
import NutritionForm from '../Components/NutritionForm'

const Nutrition = () => {
  return (
    <>
      <div className="surface-ground px-4 py-5 md:px-6 lg:px-8">
        <div className="border-bottom-1 surface-border">
          <span className="block text-4xl font-bold text-900 mb-4">Nutritions</span>
        </div>        
      </div>

      <div className='surface-ground px-4 py-2 md:px-6 lg:px-8'>
        <div className="grid">
          <div className='col-12 md:col-6'>
            <div className='surface-card border-round shadow-2 p-4'>
              <NutritionForm />
            </div>
          </div>
          <div className='col-12 md:col-6'>
            <div className='surface-card border-round shadow-2 p-4'>
              <NutritionsList />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Nutrition