import User from '../model/userSchema.js'
import Vendor from '../model/vendorSchema.js'
import Booking from '../model/bookingSchema.js'
import mongoose from 'mongoose';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function addBooking(req, res) {
    try {
        const vendor = await Vendor.findById(req.query.vendorId)
        const bookerUser = await User.findById(req.query.userId)
        const bookerVendor = await Vendor.findById(req.query.userId)
        if (vendor) {
            const existVendor = await Booking.findOne({vendorId:req.query.vendorId})
            console.log(existVendor,"====");
            if (existVendor == null) {
                const newBooking = new Booking({
                    vendorId:req.query.vendorId,
                })
                await newBooking.save()
            }
            await Booking.updateOne({vendorId:req.query.vendorId},{
                $push:{
                    bookings:{
                        bookerId:req.query.userId,
                        bookerName:bookerUser ? bookerUser.firstName + ' ' + bookerUser.lastName : bookerVendor.firstName + ' ' + bookerVendor.lastName,
                        bookerImage:bookerUser ? bookerUser.image : bookerVendor.image,
                        location:req.body.location,
                        date:req.body.date,
                        details:req.body.details,
                        status:"Pending"
                    }
                }
            })

        }
        
        res.json(true)
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getBookings(req, res) {
    try {
        const bookings = await Booking.findOne({vendorId:req.query.vendorId})
        res.json({status:'success' , bookings:bookings})
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function acceptBooking(req, res) {
    try {
        await Booking.updateOne({vendorId:req.query.vendorId ,  "bookings._id":req.query.bookingId},{
            $set:{
                "bookings.$.status":'Confirmed'
            }
        })
        let currentBookerId = await Booking.findOne({vendorId:req.query.vendorId})
        currentBookerId = currentBookerId.bookings.filter((doc)=>doc._id == req.query.bookingId)
        currentBookerId = currentBookerId[0].bookerId
        res.json({status:'success', currentBookerId})
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function declineBooking(req, res) {
    try {
        await Booking.updateOne({vendorId:req.query.vendorId ,  "bookings._id":req.query.bookingId},{
            $set:{
                "bookings.$.status":'Pending'
            }
        })
        let currentBookerId = await Booking.findOne({vendorId:req.query.vendorId})
        currentBookerId = currentBookerId.bookings.filter((doc)=>doc._id == req.query.bookingId)
        currentBookerId = currentBookerId[0].bookerId
        res.json({status:'success', currentBookerId})
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getBookingDates(req, res) {
    try {
        const bookings = await Booking.findOne({vendorId:req.query.vendorId})

        res.json({status:'success', bookings})
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// export async function getUserBooking(req, res) {
//     try {
//         const allBookings = await Booking.aggregate([
//             {
//                 $unwind: {
//                     path: "$bookings",
//                 },
//             },
//             {
//                 $match: {
//                     bookerId: mongoose.Types.ObjectId(req.query.userId),
//                 },
//             },
//             {
//                 $sort: { createdAt: -1 }
//             },
//         ])
//         console.log(allBookings,"lllll");
//         res.json({status:'success'})
//     } catch (error) {
//         console.log(error)
//     }
// }