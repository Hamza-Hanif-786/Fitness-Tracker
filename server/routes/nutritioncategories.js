import express from 'express'
import NutritionCategoriesModel from '../models/NutritionCategories.js'

const nutritionCategoriesRouter = express.Router()

// 1. Get Api
nutritionCategoriesRouter.get('/', async (req, res) => {
    try {
        const nutritionCategories = await NutritionCategoriesModel.find()
        res.status(200).json(nutritionCategories)
    } catch (error) {
        console.error('Server Error - Nutrition Categories not fetched ', error)
        res.status(500).json({ message: 'Nutrition Categories could not be fetched' })
    }
})

// 2. Post Api
nutritionCategoriesRouter.post('/', async (req, res) => {
    const { categoryname } = req.body

    if(!categoryname || categoryname.trim() === ''){
        return res.status(400).json({ message: 'Category Title is required' })
    }

    // Save the contact message to the database
    try {
            const newNutritionCategory = new NutritionCategoriesModel(req.body)
            await newNutritionCategory.save()
            res.status(201).json({ message: 'Nutrition Category Added successfully' })
        } catch (error) {
            console.error('Server Error - Nutrition Category not added ', error)
            res.status(500).json({ message: 'Nutrition Category could not be added' })
        }
})

// 3. Patch Api
nutritionCategoriesRouter.patch('/:id', async (req, res) => {
  console.log('PATCH /api/nutrition-categories/:id called');
  console.log('Params id:', req.params.id);
  console.log('Body:', req.body);

  try {
    const nutritionCategory = await NutritionCategoriesModel.findById(req.params.id);
    if (!nutritionCategory) {
      return res.status(404).json({ message: 'nutritionCategory record not found' });
    }
    if (req.body.categoryname != null) {
      nutritionCategory.categoryname = req.body.categoryname;
    }
    const updatedNutritionCategory = await nutritionCategory.save();
    res.status(200).json(updatedNutritionCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Error updating category to db' });
  }
});


//4. Get Single Api
nutritionCategoriesRouter.get('/:id', async (req, res) => {
    try {
        const nutritionCategory = await NutritionCategoriesModel.findOne(req.params.id)
        res.status(200).json(nutritionCategory)
    } catch (error) {
        console.error('Server Error - Nutrition Category not fetched ', error)
        res.status(500).json({ message: 'Nutrition Category could not be fetched' })
    }
})



export default nutritionCategoriesRouter
