import express from 'express'
import WorkoutModel from '../models/Workouts.js'

const workoutRouter = express.Router()

// 1. Get Api
workoutRouter.get('/', async (req, res) => {
    try {
        const userId = req.query.userId
        const workouts = await WorkoutModel.find({ userId })
        res.status(200).json(workouts)
    } catch (error) {
        console.error('Server Error - Workouts not fetched ', error)
        res.status(500).json({ message: 'Workouts could not be fetched' })
    }
})

// 2. Post Api 
workoutRouter.post('/', async (req, res) => {
    const { title, category, sets, reps, notes, userId } = req.body

    if(!title || title.trim() === ''){
        return res.status(400).json({ message: 'Title is required' })
    }

    if(!category || category.trim() === ''){
        return res.status(400).json({ message: 'Category is required' })
    }

    if(!sets){
        return res.status(400).json({ message: 'Sets is required' })
    }

    if(!reps){
        return res.status(400).json({ message: 'Reps is required' })
    }

    if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
    }

    // Save the contact message to the database
    try {
            const newWorkout = new WorkoutModel(req.body)
            await newWorkout.save()
            res.status(201).json({ message: 'Workout Added successfully' })
        } catch (error) {
            console.error('Server Error - Workout not added ', error)
            res.status(500).json({ message: 'Workout could not be added' })
        }
})

// 3. Delete Api
workoutRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    if(!id){
        return res.status(400).json({ message: 'Workout Id is required' })
    }
    try {
        const deletedWorkout = await WorkoutModel.findByIdAndDelete(id)
        if(!deletedWorkout){
            return res.status(404).json({ message: 'Workout not found' })
        }
        res.status(200).json({ message: 'Workout deleted successfully' })
    } catch (error) {
        console.error('Server Error - Workout not deleted ', error)
        res.status(500).json({ message: 'Workout could not be deleted' })
    }
})


export default workoutRouter
