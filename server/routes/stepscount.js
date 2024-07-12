import express from 'express'
import StepsModel from '../models/StepsCount.js'

const stepsRouter = express.Router()

// 1. Get Api
stepsRouter.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        let stepCount = await StepsModel.findOne({ userId, date: today })
        
        if (!stepCount) {
            stepCount = new StepsModel({
                userId: userId,
                date: today
            });
            await stepCount.save();
        }

        res.status(200).json(stepCount)
    } catch (error) {
        console.error('Server Error - StepsCount not found ', error)
        res.status(500).json({ message: 'stepscount could not be fetched' })
    }
})

// 2. Patch Api
stepsRouter.patch('/:id', async (req, res) => {
    try {
            const stepCount = await StepsModel.findById(req.params.id)
            if (stepCount == null) {
                return res.status(404).json({ message: 'stepscount record not found' })
            }

            if(req.body.dailyGoal != null){
                stepCount.dailyGoal = req.body.dailyGoal
            }

            if(req.body.currentSteps != null){
                stepCount.currentSteps = req.body.currentSteps
            }

            const updatedStepCount = await stepCount.save()
            res.status(200).json(updatedStepCount)
        } catch (error) {
            console.error('Error adding stepcount', error)
            res.status(500).json({ message: 'Error adding stepscount to db' })
        }
})


export default stepsRouter
