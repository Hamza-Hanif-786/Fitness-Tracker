import mongoose from "mongoose";

const waterIntakeSchema = new mongoose.Schema({
    dailyGoal: { type: Number, default: 4000 },
    waterIntake: { type: Number, default: 0 },
    userId: { type: String },
    date: { type: Date, default: Date.now }
});

waterIntakeSchema.index({ userId: 1, date: 1 }, { unique: true });
const WaterIntakeModel = mongoose.model('waterintake', waterIntakeSchema);

export default WaterIntakeModel