import express from 'express'
import NutritionModel from '../models/Nutritions.js'

const nutritionsRouter = express.Router()

// 1. Get Api
nutritionsRouter.get('/', async (req, res) => {
    try {
        const userId = req.query.userId
        const nutritions = await NutritionModel.find({ userId })
        res.status(200).json(nutritions)
    } catch (error) {
        console.error('Server Error - Nutritions not fetched ', error)
        res.status(500).json({ message: 'Nutritions could not be fetched' })
    }
})

// 2. Post Api 
nutritionsRouter.post('/', async (req, res) => {
    const { title, category, calories, protein, notes, userId } = req.body

    if(!title || title.trim() === ''){
        return res.status(400).json({ message: 'Title is required' })
    }

    if(!category || category.trim() === ''){
        return res.status(400).json({ message: 'Category is required' })
    }

    if(!calories){
        return res.status(400).json({ message: 'Calories is required' })
    }

    if(!protein){
        return res.status(400).json({ message: 'Protein is required' })
    }

    if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
      }

    // Save the contact message to the database
    try {
            const newNutrition = new NutritionModel(req.body)
            await newNutrition.save()
            res.status(201).json({ message: 'Nutrition Added successfully' })
        } catch (error) {
            console.error('Server Error - Nutrition not added ', error)
            res.status(500).json({ message: 'Nutrition could not be added' })
        }
})

// 3. Delete Api
nutritionsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    if(!id){
        return res.status(400).json({ message: 'Nutrition Id is required' })
    }
    try {
        const deletedNutrition = await NutritionModel.findByIdAndDelete(id)
        if(!deletedNutrition){
            return res.status(404).json({ message: 'Nutrition not found' })
        }
        res.status(200).json({ message: 'Nutrition deleted successfully' })
    } catch (error) {
        console.error('Server Error - Nutrition not deleted ', error)
        res.status(500).json({ message: 'Nutrition could not be deleted' })
    }
})

export default nutritionsRouter
