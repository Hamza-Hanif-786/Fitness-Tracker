import express from 'express'
import CaloriesModel from '../models/CaloriesBurned.js'

const caloriesRouter = express.Router()

// 1. Get Api
caloriesRouter.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        let caloryBurned = await CaloriesModel.findOne({ userId, date: today })
        
        if (!caloryBurned) {
            caloryBurned = new CaloriesModel({
                userId: userId,
                date: today
            });
            await caloryBurned.save();
        }

        res.status(200).json(caloryBurned)
    } catch (error) {
        console.error('Server Error - CaloriesBurned not found ', error)
        res.status(500).json({ message: 'caloriesBurned could not be fetched' })
    }
})

// 2. Patch Api
caloriesRouter.patch('/:id', async (req, res) => {
    try {
            const caloryBurned = await CaloriesModel.findById(req.params.id)
            if (caloryBurned == null) {
                return res.status(404).json({ message: 'caloriesBurned record not found' })
            }

            if(req.body.dailyGoal != null){
                caloryBurned.dailyGoal = req.body.dailyGoal
            }

            if(req.body.caloriesBurned != null){
                caloryBurned.caloriesBurned = req.body.caloriesBurned
            }

            const updatedCaloryBurned = await caloryBurned.save()
            res.status(200).json(updatedCaloryBurned)
        } catch (error) {
            console.error('Error adding caloriesBurned', error)
            res.status(500).json({ message: 'Error adding caloriesBurned to db' })
        }
})


export default caloriesRouter
