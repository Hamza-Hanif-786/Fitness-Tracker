import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    description: { type: String, required: true },
    userId: { type: String },
    date: { type: Date, default: Date.now }
});

const TaskModel = mongoose.model('tasks', taskSchema);

export default TaskModel