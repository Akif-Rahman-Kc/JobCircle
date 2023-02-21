import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
    members:{
        type:Array
    },
},{ timestamps: true })

export default model('chats',chatSchema);