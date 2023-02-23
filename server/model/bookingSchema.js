import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    vendorId:{
        type:Schema.Types.ObjectId,
        ref:'vendor',
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
    },{ timestamps: true }]
},{ timestamps: true })

export default model('bookings',bookingSchema);