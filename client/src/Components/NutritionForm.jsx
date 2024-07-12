import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '@clerk/clerk-react';
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber';
import { Meals } from '../Constants';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import axios from 'axios';              

const NutritionForm = () => {
    const toast = useRef(null);
    const { userId } = useAuth();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [formData, setFormData] = useState({
        title: '',
        category: Meals[0].title,
        calories: null,
        protein: null,
        notes: '',
        userId: userId
    })   

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Thank you', detail: 'Nutrition Added' });
    }
    
    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please try again later' });
    }

    const handleCategorySelect = (event) => {
        setActiveIndex(event.index);
        setFormData({
            ...formData,
            category: Meals[event.index].title
        })
    }

    useEffect(() => {
        console.log(formData.category)
    }, [formData.category])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleSubmittion = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:4000/api/nutritions', formData);
            console.log('Server Response - Nutritions Data ', response.data);
            if (response.status === 201) {
              showSuccess();
              setLoading(false);
              setFormData({
                title: '',
                category: Meals[0].title,
                calories: null,
                protein: null,
                notes: '',
                userId: userId
              })
            } else {
                showError();
            }
        } catch (error) {
            console.error('Server Error - Nutritions Data ', error);
        }
    }

    

  return (
    <>
        <Button label='Add Nutrition Routine' onClick={() => setVisible(true)} icon='pi pi-plus'/>
        <Dialog visible={visible} style={{ width: '50vw' }} header='Add Nutrition Routine' maximizable className='p-fluid' onHide={() => setVisible(false)}>
            <Toast ref={toast} />   
            <form onSubmit={handleSubmittion}>
                <div className='field'>
                    <label htmlFor="title" className='block font-medium text-900'>
                        Title<span className='text-red-500'>*</span>
                    </label>
                    <InputText id="title" type="text" className='w-full' name='title' placeholder='e.g Oatmeal with Berries' required value={formData.title} onChange={handleChange} />
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
                            onValueChange={handleChange} 
                        />
                    </div>
                    <div className='field col'>
                        <label htmlFor='protein' className='block font-medium text-900'>
                            Protein<span className='text-red-500'>*</span>
                        </label>
                        <InputNumber min={0} inputId='protein' className='w-full' name='protein' placeholder='150 protein' required useGrouping={false} suffix='  protein' value={formData.protein} 
                            onValueChange={handleChange} 
                        />
                    </div>
                </div>
                <div className='field'>
                    <label htmlFor="notes" className='block font-medium text-900'>
                        Notes<span className='text-gray-400 font-italic text-sm'> (optional)</span>
                    </label>
                    <InputTextarea value={formData.notes} onChange={handleChange} autoResize rows={5} className='w-full' name='notes' />    
                </div>
                <Button severity='primary' className='w-full' onClick={handleSubmittion} label='Submit' loading={loading} disabled={loading} />
            </form>
        </Dialog>
    </>
  )
}

export default NutritionForm