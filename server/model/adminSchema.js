import { Schema, model } from 'mongoose';

const adminSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        trim: true
    }
    
},{ timestamps: true })

export default model('admins',adminSchema);