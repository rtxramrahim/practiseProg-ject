import express from 'express'
import dotenv from 'dotenv'
import mongoose  from 'mongoose'
import userRoutes from './Routes/userRoutes.js'
import profileRoutes from './Routes/profileRoutes.js'
import cors  from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()

const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())
app.listen(PORT,()=>{
    console.log(`App is up and running at port ${PORT}`)
})

app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("Database connected succesfully!!")
}).catch((err)=>{
    console.log("error in dbConnection")
    console.log(err)
})

app.get("/" , (req,res)=>{
    res.send("app is up and running")
})

app.use("/api/auth" , userRoutes )
app.use("/api/profile" , profileRoutes)



// middleware to handle errors
// app.use((err , req, res , next)=>{
//     const statusCode = err.statusCode || 500
//     const message = err.message || 'Internal Server Error!!'

//     return res.status(statusCode).json({
//         success : false,
//         statusCode,
//         message
//     })

// })
