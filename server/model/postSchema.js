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
    Likes:{
        type:Array
    },
    Comments:[{
        vendorId:{
            type:String,
            required: true,
        },
        comment:{
            type:String,
            required: true,
        },
        writerName:{
            type:String,
            required: true,
        },
        writerImage:{
            type:String,
            required: true,
        },
        time:{
            type:String,
            required: true,
        },
        myComment:{
            type: Boolean,
            default:false
        }
    }],
    
},{ timestamps: true })

export default model('posts',postSchema);