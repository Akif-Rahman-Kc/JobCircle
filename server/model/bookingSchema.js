import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required: true,
    },
    bookings:[{
        bookerId:{
            type:String,
            required: true,
        },
        bookerName:{
            type:String,
            required: true,
        },
        bookerImage:{
            type:String,
            required: true,
        },
        location:{
            type:String,
            required: true,
        },
        date:{
            type:Date,
            required: true,
        },
        details:{
            type:String,
        },
        status:{
            type:String,
        },
    }]
},{ timestamps: true })

export default model('bookings',bookingSchema);