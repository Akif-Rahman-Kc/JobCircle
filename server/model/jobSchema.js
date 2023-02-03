import { Schema, model } from 'mongoose';

const jobSchema = new Schema({
    jobName:{
        type:String,
        required:true,
        trim:true
    }
    
},{ timestamps: true })

export default model('jobs',jobSchema);