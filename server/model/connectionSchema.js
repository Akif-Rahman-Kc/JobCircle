import { Schema, model } from 'mongoose';

const connectionSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required: true,
    },
    connections:[{
        connectorId:{
            type:String,
            required: true,
        },
        connectorName:{
            type:String,
            required: true,
        },
        connectorImage:{
            type:String,
            required: true,
        },
        status:{
            type:String,
            default:'pending'
        },
    }]
    
},{ timestamps: true })

export default model('connections',connectionSchema);