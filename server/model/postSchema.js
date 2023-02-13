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
        writerId:{
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
        }
    }],
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

export default model('posts',postSchema);