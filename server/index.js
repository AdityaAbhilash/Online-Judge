import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { Connection } from './config/db.js'
import { Router } from './routes/routes.js'


Connection()

const app = express()

//middlewares
app.use(express.json()) //convert to json format
app.use(cors())
app.use(express.urlencoded({ extended: true }));


dotenv.config({path: "./config/.env"}) //load environment virable into this file

app.use('/',Router) 


app.listen(process.env.PORT,()=>{
    console.log("App is running")
})



