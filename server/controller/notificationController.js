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