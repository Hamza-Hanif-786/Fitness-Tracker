import React, { useRef, useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Divider } from 'primereact/divider';  
import moment from 'moment';

const Todo = () => {
    const [calenderDate, setCalenderDate] = useState(new Date());
    const [formData, setFormData] = useState({
        description: '',
        date: moment().format('DD/MM/YYYY')
    })
    const [filteredTasks, setFilteredTasks] = useState([])
    const op = useRef(null);

  const taskslist = [
    { description: '5000 Steps Done', date: moment('18/06/2024', 'DD/MM/YYYY') },
    { description: '5000 Steps Done', date: moment('18/06/2024', 'DD/MM/YYYY') },
    { description: '100 Push-Ups Goal', date: moment('19/06/2024', 'DD/MM/YYYY') },
    { description: '100 Push-Ups Goal', date: moment('19/06/2024', 'DD/MM/YYYY') },
    { description: '100 Push-Ups Goal', date: moment('19/06/2024', 'DD/MM/YYYY') },
    { description: '10 Laps Goal', date: moment('20/06/2024', 'DD/MM/YYYY') },
    { description: '10 Laps Goal', date: moment('20/06/2024', 'DD/MM/YYYY') },
    { description: '10 Laps Goal', date: moment('20/06/2024', 'DD/MM/YYYY') },
    { description: '10 Laps Goal', date: moment('20/06/2024', 'DD/MM/YYYY') },
  ]

  const handleTaskDateChange = (e) => {
    setCalenderDate(e.value)
    filterTaskByDate(e.value)
  }

  const handleSubmit = () => {
    setFormData({ description: '', date: moment().format('DD/MM/YYYY') })
    taskslist.push(formData)
    op.current.hide()
    console.log(formData)
  }

  const filterTaskByDate = (calenderDate) => {
    if (calenderDate) {
      const filteredTasks = taskslist.filter(task => task.date.isSame(calenderDate, 'day'))
      setFilteredTasks(filteredTasks)
    } else {
      setFilteredTasks(taskslist)
    }
  }

  useEffect(() => {
    filterTaskByDate(calenderDate)
  }, [calenderDate])


  return (
    <>
        <div className='flex align-items-center justify-content-between mb-3'>
            <span className='text-lg sm:text-xl text-900 font-bold'>Todo List</span>
            <div className='flex align-items-center justify-content-between'>
                <Button icon="pi pi-plus" rounded severity='success' className='mr-2' onClick={(e) => op.current.toggle(e)} />
                <Calendar value={calenderDate} onChange={handleTaskDateChange} hourFormat="12" placeholder='Select Date to View Tasks' showButtonBar={true}/>
                <OverlayPanel ref={op} showCloseIcon>
                    <div className='flex-1 p-inputgroup'>
                        <InputText placeholder="Add Task" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value})}/>
                        <Button icon="pi pi-save" severity='secondary' onClick={handleSubmit} />
                    </div>
                </OverlayPanel>
            </div>
        </div> 
        <Divider />
        <div>
            {filteredTasks.map((task, index) => (
                <div className='flex align-items-center justify-content-between mb-3 surface-100 px-3 py-1 border-round-xl' key={index}>
                    <div className='flex flex-column'>
                        <span className='text-lg text-600 font-medium'>{task.description}</span>
                        <small className='text-400 text-xs mt-2 font-italic'>Created on {task.date.format('DD MMM YYYY')}</small> 
                    </div>
                    <Button icon="pi pi-trash" rounded className='mr-2 text-red-500' text severity='danger'></Button>
                </div>
            )) 
            }
            {filteredTasks.length === 0 && (
                <div className='text-center text-400 font-medium text-lg'>No tasks for this date</div>
            )}
        </div>
    </>
  )
}

export default Todo