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
    }
    
},{ timestamps: true })

export default model('messages',messageSchema);