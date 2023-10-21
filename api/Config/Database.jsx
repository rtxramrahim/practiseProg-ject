import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()
const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log("database connected!")
    }).catch(()=>{
        console.log("error occured while connecting to database!")
        console.log(err)
    })
}

export default dbConnect 