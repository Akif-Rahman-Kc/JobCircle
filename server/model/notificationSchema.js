import mongoose, { Schema, model } from 'mongoose';

const notificationSchema = new Schema({
    senderId:{
        type:mongoose.Types.ObjectId,
    },
    recieverId:{
        type:mongoose.Types.ObjectId,
    },
    content:{
        type:String,
    },
    type: {
        type:String,
        default:'warning'
    },
    href:{
        type:String,
    },
    
},{ timestamps: true,
    capped: {
    size:1024,
    max: 1000,
    autoIndexId:true
} })

export default model('notifications',notificationSchema);