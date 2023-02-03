import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
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
    },
    phoneNo:{
        required: true,
        type: String,
        trim: true
    },
    locality:{
        required: true,
        type: String,
        trim: true
    },
    city:{
        required: true,
        type: String,
        trim: true
    },
    state:{
        required: true,
        type: String,
        trim: true
    },
    image:{
        type: String,
    }
    
},{ timestamps: true })

export default model('users',userSchema);