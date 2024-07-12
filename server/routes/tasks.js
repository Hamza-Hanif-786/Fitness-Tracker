import express from 'express'
import TaskModel from '../models/Tasks.js'

const taskRouter = express.Router()

// 1. Get Api
taskRouter.get('/', async (req, res) => {
    try {
        const userId = req.query.userId
        const tasks = await TaskModel.find({ userId })
        res.status(200).json(tasks)
    } catch (error) {
        console.error('Server Error - Tasks not fetched ', error)
        res.status(500).json({ message: 'tasks could not be fetched' })
    }
})

// 2. Post Api
taskRouter.post('/', async (req, res) => {
    const { description, userId } = req.body

    if(!description || description.trim() === ''){
        return res.status(400).json({ message: 'Description is required' })
    }

    if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
      }

    // Save the Task to the database
    try {
            const newTask = new TaskModel(req.body)
            await newTask.save()
            res.status(201).json({ message: 'task added successfully' })
        } catch (error) {
            console.error('Error adding task', error)
            res.status(500).json({ message: 'Error adding task to db' })
        }
})

// 3. Delete Api
taskRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    if(!id){
        return res.status(400).json({ message: 'Task Id is required' })
    }
    try {
        const deletedTask = await TaskModel.findByIdAndDelete(id)
        if(!deletedTask){
            return res.status(404).json({ message: 'Task not found' })
        }
        res.status(200).json({ message: 'Task deleted successfully' })
    } catch (error) {
        console.error('Server Error - Task not deleted ', error)
        res.status(500).json({ message: 'Task could not be deleted' })
    }
})

export default taskRouter
