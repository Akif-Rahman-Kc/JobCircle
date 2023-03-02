import Notification from '../model/notificationSchema.js'
import Vendor from '../model/vendorSchema.js'
import User from '../model/userSchema.js'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function addNotification(req, res) {
    try {
        await Notification.create(req.body)
        res.json(true)
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getNotifications(req, res) {
    try {
        const notifications = await Notification.find({recieverId:req.query.userId})
        res.json(notifications)
    } catch (error) {
        console.log(error)
    }
}