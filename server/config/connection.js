import { Router } from 'express';
import { set, connect } from "mongoose";
const router = Router();

const mongoDB = "mongodb://127.0.0.1/JobCircle";
set('strictQuery', false);
connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Connected");
}).catch((err)=>{
    console.log("Connection failed",err);
})

export default router;