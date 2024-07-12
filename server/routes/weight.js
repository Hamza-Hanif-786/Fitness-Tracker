import express from 'express'
import WeightModel from '../models/Weight.js'

const weightRouter = express.Router()

// 1. Get Api
weightRouter.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        const date = new Date()
        const currentMonth = date.getMonth() + 1
        const currentYear = date.getFullYear()

        let weightGoal = await WeightModel.findOne({ userId, month: currentMonth, year: currentYear })
        
        if (!weightGoal) {
            weightGoal = new WeightModel({
                userId: userId,
                month: currentMonth,
                year: currentYear,
                targetWeight: 0,
                currentWeight: 0
            });
            await weightGoal.save();
        }

        res.status(200).json(weightGoal)
    } catch (error) {
        console.error('Server Error - weightGoal not found ', error)
        res.status(500).json({ message: 'weightGoal could not be fetched' })
    }
})

// 2. Patch Api
weightRouter.patch('/:id', async (req, res) => {
    try {
            const weightGoal = await WeightModel.findById(req.params.id)
            if (weightGoal == null) {
                return res.status(404).json({ message: 'weightGoal record not found' })
            }

            if(req.body.targetWeight != null){
                weightGoal.targetWeight = req.body.targetWeight
            }

            if(req.body.currentWeight != null){
                weightGoal.currentWeight = req.body.currentWeight
            }

            const updatedWeightGoal = await weightGoal.save()
            res.status(200).json(updatedWeightGoal)
        } catch (error) {
            console.error('Error adding weightGoal', error)
            res.status(500).json({ message: 'Error adding weightGoal to db' })
        }
})


export default weightRouter
