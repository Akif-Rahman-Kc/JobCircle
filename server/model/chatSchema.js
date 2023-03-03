import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
    members:{
        type:Array
    },
    sortHelper:{
        type:String
    }
},{ timestamps: true })

export default model('chats',chatSchema);