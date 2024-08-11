import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { Connection } from './config/db.js'
import { Router } from './routes/routes.js'
import cookieParser from 'cookie-parser';

Connection()

const app = express()


//middlewares
app.use(express.json()) //convert to json format
app.use(cookieParser()); 
// app.use(cors({withCredentials: true, origin:"https://www.algoapex.online"}));

const allowedOrigins = [
    'https://www.algoapex.online',
    'http://localhost:5173',
    'https://online-judge-frkkz97yy-aditya-abhilashs-projects.vercel.app',
    'https://online-judge-be9e5a8e9-aditya-abhilashs-projects.vercel.app'
];

app.use(cors({
    withCredentials: true,
    origin: function(origin, callback){
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));

app.use(express.urlencoded({ extended: true }));


dotenv.config({path: "./config/.env"}) //load environment virable into this file

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.use('/',Router) 



app.listen(process.env.PORT,()=>{
    console.log("App is running")
})



