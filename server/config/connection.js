const express = require('express')
const mongoose = require("mongoose");
const router = express.Router();

const mongoDB = "mongodb+srv://Akif:akif1011@cluster0.b6f7vug.mongodb.net/JobCircle";
mongoose.set('strictQuery', false);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Connected");
}).catch((err)=>{
    console.log("Connection failed",err);
})

module.exports = router;