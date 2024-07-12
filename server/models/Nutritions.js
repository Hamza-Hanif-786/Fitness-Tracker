import mongoose from "mongoose";

const nutritionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    notes: { type: String, required: false },
    userId: { type: String }
});

const NutritionModel = mongoose.model('nutritions', nutritionSchema);

export default NutritionModel