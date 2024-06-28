import React, { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber';
import { Meals } from '../Constants';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import moment from 'moment';                

const NutritionForm = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [formData, setFormData] = useState({
        title: '',
        category: Meals[0].title,
        calories: null,
        protein: null,
        date: moment().format('DD/MM/YYYY'),
        notes: ''
    })   

    const handleCategorySelect = (event) => {
        setActiveIndex(event.index);
        setFormData({
            ...formData,
            category: Meals[event.index].title
        })
    }

    const handleSubmittion = (event) => {
        event.preventDefault();
        
        console.log(formData)
    }

    useEffect(() => {
        console.log(formData.category)
    }, [formData.category])

  return (
    <>
        <div className='field'>
            <label htmlFor="title" className='block font-medium text-900'>
                Title<span className='text-red-500'>*</span>
            </label>
            <InputText id="title" type="text" className='w-full' name='title' placeholder='e.g Oatmeal with Berries and Nuts' required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        </div>

        <div className='field'>
            <div className='flex align-items-center justify-content-between'>
                <label htmlFor="category" className='block font-medium text-900'>
                    Category<span className='text-red-500'>*</span>
                </label>
                <span className='text-sm text-600'>{formData.category}</span>  
            </div>
            
            <div className='flex flex-wrap align-items-center mb-3 mt-2 gap-2'>
                {Meals.map((meal, index) => (
                    <div className={`surface-card p-3 border-round-xl border-3 ${activeIndex === index ? 'border-primary' : 'border-100'} hover:border-primary hover:border-3 flex flex-column transition-duration-150 transition-colors`} key={index} onClick={() => handleCategorySelect({index}, index)}>
                        <img src={meal.image} alt={meal.title} className='w-7rem h-7rem' />
                        <span className='mt-3 font-medium text-900 text-sm text-center'>{meal.title}</span>
                    </div>
                ))}
            </div>   
        </div>

        <div className='grid formgrid'>
            <div className='field col'>
                <label htmlFor='calories' className='block font-medium text-900'>
                    Calories<span className='text-red-500'>*</span>
                </label>
                <InputNumber min={0} inputId='calories' className='w-full' name='calories' placeholder='100 calories' required useGrouping={false} suffix='  calories' value={formData.calories} 
                    onValueChange={(e) => setFormData({ ...formData, calories: e.target.value })} 
                />
            </div>

            <div className='field col'>
                <label htmlFor='protein' className='block font-medium text-900'>
                    Protein<span className='text-red-500'>*</span>
                </label>
                <InputNumber min={0} inputId='protein' className='w-full' name='protein' placeholder='150 protein' required useGrouping={false} suffix='  protein' value={formData.protein} 
                    onValueChange={(e) => setFormData({ ...formData, protein: e.target.value})} 
                />
            </div>
        </div>

        <div className='field'>
            <label htmlFor="notes" className='block font-medium text-900'>
                Notes<span className='text-gray-400 font-italic text-sm'> (optional)</span>
            </label>
            <InputTextarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} autoResize rows={5} className='w-full' />    
        </div>

        <Button severity='primary' className='w-full' onClick={handleSubmittion} label='Submit' />
    </>
  )
}

export default NutritionForm