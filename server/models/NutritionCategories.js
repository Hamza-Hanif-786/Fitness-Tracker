import mongoose from "mongoose";

const nutritioncategoriesSchema = new mongoose.Schema({
    categoryname: { type: String },
    date: { type: Date, default: Date.now }
});

nutritioncategoriesSchema.index({  date: 1 }, { unique: true });
const NutritionCategoriesModel = mongoose.model('nutritioncategories', nutritioncategoriesSchema);

export default NutritionCategoriesModel