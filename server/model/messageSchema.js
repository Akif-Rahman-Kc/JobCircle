import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    chatId:{
        type:String
    },
    senderId:{
        type:String
    },
    text:{
        type:String
    },
    readed:{
        type:Boolean,
        default:false
    }
    
},{ timestamps: true })

export default model('messages',messageSchema);