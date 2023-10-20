import express from 'express'
import dotenv from 'dotenv'
import mongoose, { mongo } from 'mongoose'
dotenv.config()
const app = express()

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`App is up and running at port ${PORT}`)
})


mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("database connected")
}).catch(()=>{
    console.log("error occured while connecting to database!")
    console.log(err)
})