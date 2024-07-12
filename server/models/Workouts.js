import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    notes: { type: String, required: false },
    userId: { type: String }
});

const WorkoutModel = mongoose.model('workouts', workoutSchema);

export default WorkoutModel