import mongoose from "mongoose";

const weightSchema = new mongoose.Schema({
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    targetWeight: { type: Number, default: 0 },
    currentWeight: { type: Number, default: 0 },
    userId: { type: String }
});

weightSchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });
const WeightModel = mongoose.model('weightreview', weightSchema);

export default WeightModel