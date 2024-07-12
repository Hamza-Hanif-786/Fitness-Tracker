import mongoose from "mongoose";

const stepsSchema = new mongoose.Schema({
    dailyGoal: { type: Number, default: 10000 },
    currentSteps: { type: Number, default: 0 },
    userId: { type: String },
    date: { type: Date, default: Date.now }
});

stepsSchema.index({ userId: 1, date: 1 }, { unique: true });
const StepsModel = mongoose.model('stepcount', stepsSchema);

export default StepsModel