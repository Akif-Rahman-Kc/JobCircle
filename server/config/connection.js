import { Router } from 'express';
import { set, connect } from "mongoose";
const router = Router();

const mongoDB = "mongodb+srv://Akif:akif1011@cluster0.b6f7vug.mongodb.net/JobCircle";
set('strictQuery', false);
connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Connected");
}).catch((err)=>{
    console.log("Connection failed",err);
})

export default router;