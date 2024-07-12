import React, { useRef, useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { OverlayPanel } from 'primereact/overlaypanel';
import { Divider } from 'primereact/divider';  
import moment from 'moment';
import { Toast } from 'primereact/toast';
import { Paginator } from 'primereact/paginator';
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'; 

const Todo = () => {
  const toast = useRef(null);
  const op = useRef(null);
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(3);
  const [taskslist, setTaskslist] = useState([])
  const [formData, setFormData] = useState({
      description: '',
      userId: userId
  })
  const fieldDisabled = formData.description === '' || formData.description.trim() === ''


  const fetchTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/todos?userId=${userId}`)
      setTaskslist(response.data)
      console.log('Server Response: Frontend - Todos ', response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {  
    if (userId) {
      fetchTodos()
    }
  }, [userId])


  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Thank you', detail: 'Task Added' });
}

const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please try again later' });
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post('http://localhost:4000/api/todos', formData)
      console.log('Server Response - Todos Data ', response.data);
      if (response.status === 201) {
        setFormData({
          description: '',
          userId: userId
        })
        setLoading(false);
        showSuccess();
      } else {
        showError();
      }
      op.current.hide()
      fetchTodos()
    } catch (error) {
      console.error('Server Error - Todos Data ', error);
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/todos/${id}`)
      fetchTodos()
    } catch (error) {
      console.error('Error deleting todos', error);
    }
  }


  return (
    <>
      <div className='flex align-items-center justify-content-between mb-3'>
        <Toast ref={toast} />
        <span className='text-lg sm:text-xl text-900 font-bold'>Todo List</span>
        <div className='flex align-items-center justify-content-between'>
          <Button icon="pi pi-plus" rounded severity='success' onClick={(e) => op.current.toggle(e)} />
          <OverlayPanel ref={op} showCloseIcon>
            <div className='flex-1 p-inputgroup'>
              <InputText placeholder="Add Task" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value})}/>
              <Button icon="pi pi-save" severity='secondary' onClick={handleSubmit} disabled={fieldDisabled} loading={loading} />
            </div>
          </OverlayPanel>
        </div>
      </div> 
      <Divider />
      <div>
        {taskslist.map((task) => (
          <div className='flex align-items-center justify-content-between mb-3 surface-100 px-3 py-1 border-round-xl' key={task._id}>
            <div className='flex flex-column'>
              <span className='text-lg text-600 font-medium'>{task.description}</span>
              <small className='text-400 text-xs mt-2 font-italic'>Created on {moment(task.date).format('DD-MM-YYYY')}</small> 
            </div>
            <Button icon="pi pi-trash" rounded className='mr-2 text-red-500' text severity='danger' onClick={() => deleteTask(task._id)}/>
          </div>
        )).slice(first, first + rows)}
        <Paginator first={first} rows={rows} totalRecords={taskslist.length} onPageChange={(e) => setFirst(e.first)} />
        {taskslist.length === 0 && (
          <div className='text-center text-400 font-medium text-lg'>No tasks Found</div>
        )}
      </div>
    </>
  )
}

export default Todo