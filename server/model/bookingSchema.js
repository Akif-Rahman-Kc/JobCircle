import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required: true,
    },
    vendorId:{
        type:Schema.Types.ObjectId,
        ref:'vendors',
        required: true,
    }
},{ timestamps: true })

export default model('bookings',bookingSchema);