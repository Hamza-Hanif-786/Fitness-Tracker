import mongoose from "mongoose";

const caloriesSchema = new mongoose.Schema({
    dailyGoal: { type: Number, default: 5000 },
    caloriesBurned: { type: Number, default: 0 },
    userId: { type: String },
    date: { type: Date, default: Date.now }
});

caloriesSchema.index({ userId: 1, date: 1 }, { unique: true });
const CaloriesModel = mongoose.model('caloriesburneds', caloriesSchema);

export default CaloriesModel