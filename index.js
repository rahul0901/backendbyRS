// console.log("hiiii rahul")
// console.log("hiiii rahul")
// console.log("hiiii rahul")
// console.log("hiiii rahul")
// importing express 
import express from 'express';
import route from './Routes/index.js';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// creating instance of express to use it..

const app = express();
app.use(morgan('dev'));
app.use(cors());
dotenv.config();
app.use(express.json());

app.get('/', function(req,res){
    res.send("hello from backenddd")
})

app.use('/app/v1', route)

mongoose.connect(process.env.MongoDB).then(()=>console.log('Database Connected'))

app.listen(8000, ()=> console.log('port running on 8000'))