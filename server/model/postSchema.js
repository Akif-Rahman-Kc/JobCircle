import { Schema, model, Mongoose } from 'mongoose';

const postSchema = new Schema({
    vendorId:{
        type:Schema.Types.ObjectId,
        ref:'vendors',
        required: true,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
        required: true,
    },
    Liked:Array
    
},{ timestamps: true })

export default model('posts',postSchema);