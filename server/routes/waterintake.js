import express from 'express'
import WaterIntakeModel from '../models/WaterIntake.js'

const waterIntakeRouter = express.Router()

// 1. Get Api
waterIntakeRouter.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        let waterIntakes = await WaterIntakeModel.findOne({ userId, date: today })
        
        if (!waterIntakes) {
            waterIntakes = new WaterIntakeModel({
                userId: userId,
                date: today
            });
            await waterIntakes.save();
        }

        res.status(200).json(waterIntakes)
    } catch (error) {
        console.error('Server Error - WaterIntake not found ', error)
        res.status(500).json({ message: 'WaterIntake could not be fetched' })
    }
})

// 2. Patch Api
waterIntakeRouter.patch('/:id', async (req, res) => {
    try {
            const waterIntakes = await WaterIntakeModel.findById(req.params.id)
            if (waterIntakes == null) {
                return res.status(404).json({ message: 'waterIntake record not found' })
            }

            if(req.body.dailyGoal != null){
                waterIntakes.dailyGoal = req.body.dailyGoal
            }

            if(req.body.waterIntake != null){
                waterIntakes.waterIntake = req.body.waterIntake
            }

            const updatedWaterIntake = await waterIntakes.save()
            res.status(200).json(updatedWaterIntake)
        } catch (error) {
            console.error('Error adding waterIntake', error)
            res.status(500).json({ message: 'Error adding waterIntake to db' })
        }
})


export default waterIntakeRouter
