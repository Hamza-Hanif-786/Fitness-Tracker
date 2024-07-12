import React, { useState, useEffect, useRef } from 'react'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { Workouts } from '../Constants';
import axios from 'axios'; 
import { useAuth } from '@clerk/clerk-react';

const WorkoutForm = () => {
    const toast = useRef(null);
    const { userId } = useAuth();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const description = Workouts[activeIndex].description
    const [formData, setFormData] = useState({
        title: '',
        category: Workouts[0].title,
        sets: null,
        reps: null,
        notes: '',
        userId: userId
    })
    
    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Thank you', detail: 'Workout Added' });
    }
    
    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please try again later' });
    }

    const handleCategorySelect = (event) => {
        setActiveIndex(event.index);
        setFormData({ ...formData, category: Workouts[event.index].title})
    }

    const handleSubmittion = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:4000/api/workouts', formData);
            console.log('Server Response - Workouts Data ', response.data);
            if (response.status === 201) {
              showSuccess();
              setLoading(false);
              setFormData({
                title: '',
                category: Workouts[0].title,
                sets: null,
                reps: null,
                notes: '',
                userId: userId
              })
            } else {
                showError();
            }
        } catch (error) {
            console.error('Server Error - Workouts Data ', error);
        }
    }

    useEffect(() => {
        console.log(formData.category)
    }, [formData.category])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

  return (
    <>
        <Button label='Add New Workout' onClick={() => setVisible(true)} icon='pi pi-plus'/>
        <Dialog visible={visible} style={{ width: '50vw' }} header='Add New Workout' maximizable className='p-fluid' onHide={() => setVisible(false)}>
            <Toast ref={toast} />   
            <form onSubmit={handleSubmittion}>
                <div className='field'>
                    <label htmlFor="title" className='block font-medium text-900'>
                        Title<span className='text-red-500'>*</span>
                    </label>
                    <InputText id="title" type="text" className='w-full' name='title' placeholder='e.g Dumbbell Circuit' required value={formData.title} onChange={handleChange} />
                </div>

                <div className='field'>
                    <div className='flex align-items-center justify-content-between'>
                        <label htmlFor="category" className='block font-medium text-900'>
                            Category<span className='text-red-500'>*</span>
                        </label>
                        <span className='text-sm text-600'>{formData.category}</span>  
                    </div>

                    <div className='flex flex-wrap align-items-center mb-3 mt-2 gap-4'>
                        {Workouts.map((workout, index) => (
                            <div className={`surface-card p-3 border-round-xl border-3 ${activeIndex === index ? 'border-primary' : 'border-100'} hover:border-primary hover:border-3 flex flex-column transition-duration-150 transition-colors`} key={index} onClick={() => handleCategorySelect({index}, index)}>
                                <img src={workout.image} alt={workout.title} className='w-8rem h-8rem' />
                                <span className='mt-3 font-medium text-900 text-sm text-center'>{workout.title}</span>
                            </div>
                        ))}
                    </div>
                    <span className='mt-3 font-medium font-italic text-600 text-sm'>{description}</span>    
                </div>

                <div className='grid formgrid'>
                    <div className='field col'>
                        <label htmlFor='sets' className='block font-medium text-900'>
                            Sets<span className='text-red-500'>*</span>
                        </label>
                        <InputNumber min={0} inputId='sets' className='w-full' name='sets' placeholder='10 sets' required useGrouping={false} suffix='  sets' value={formData.sets} onValueChange={handleChange} />
                    </div>

                    <div className='field col'>
                        <label htmlFor='reps' className='block font-medium text-900'>
                            Reps<span className='text-red-500'>*</span>
                        </label>
                        <InputNumber min={0} inputId='reps' className='w-full' name='reps' placeholder='15 reps' required useGrouping={false} suffix='  reps' value={formData.reps} onValueChange={handleChange} />
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor="notes" className='block font-medium text-900'>
                        Notes<span className='text-gray-400 font-italic text-sm'> (optional)</span>
                    </label>
                    <InputTextarea value={formData.notes} onChange={handleChange} autoResize rows={5} className='w-full' name='notes'/>    
                </div>

                <Button severity='primary' className='w-full' type='submit' label='Submit' onClick={handleSubmittion} loading={loading} disabled={loading} />
            </form>
        </Dialog>
    </>
  )
}

export default WorkoutForm