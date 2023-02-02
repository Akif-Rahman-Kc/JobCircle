import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    vendorId:{
        type:String,
        required: true,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
        required: true,
    },
    
},{ timestamps: true })

export default model('posts',postSchema);