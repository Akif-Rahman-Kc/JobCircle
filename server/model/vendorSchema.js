import { Schema, model } from 'mongoose';

const vendorSchema = new Schema({
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
    job:{
        required: true,
        type: String,
        trim: true
    },
    experiance:{
        required: true,
        type: String,
        trim: true
    },
    jobDays:{
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
    },
    isBlock:{
        type: Boolean,
        default:false
    },
    Reports:[{
        reporterId:{
            type:String,
            required: true,
        },
        reportMessage:{
            type:String,
            required: true,
        },
        reporterName:{
            type:String,
            required: true,
        },
        reporterImage:{
            type:String,
            required: true,
        },
    },{ timestamps: true }],
    
},{ timestamps: true })

export default model('vendors',vendorSchema);