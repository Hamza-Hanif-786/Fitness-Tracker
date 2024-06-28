import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import cors from 'cors'

const port = 4000
const app = express()

app.listen(port, () => {
    console.log("Server is Running on Port: " + port);
})

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(path.resolve(), "public")))
app.use(express.urlencoded({ extended: true }))

mongoose.connect("mongodb://localhost:27017/fitnesstracker")
.then(() => console.log("Database Connected"))
.catch(err => console.log(err))

