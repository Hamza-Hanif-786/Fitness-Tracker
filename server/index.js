import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import contactRouter from './routes/contact.js'
import workoutRouter from './routes/workouts.js'
import nutritionsRouter from './routes/nutritions.js'
import taskRouter from './routes/tasks.js'
import stepsRouter from './routes/stepscount.js'
import caloriesRouter from './routes/caloriesburned.js'
import waterIntakeRouter from './routes/waterintake.js'
import weightRouter from './routes/weight.js'

const port = 4000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect("mongodb://localhost:27017/fitnesstracker")
.then(() => console.log("Database Connected"))
.catch(err => console.log(err))

app.use('/api/contact', contactRouter)
app.use('/api/workouts', workoutRouter)
app.use('/api/nutritions', nutritionsRouter)
app.use('/api/todos', taskRouter)
app.use('/api/stepsCount', stepsRouter)
app.use('/api/caloriesBurned', caloriesRouter)
app.use('/api/waterIntake', waterIntakeRouter)
app.use('/api/weightGoal', weightRouter)

app.listen(port, () => {
    console.log("Server is Running on Port: " + port);
})