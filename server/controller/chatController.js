import Chat from '../model/chatSchema.js'
import User from '../model/userSchema.js'
import Vendor from '../model/vendorSchema.js'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function createChat(req, res) {
    try {
        const chat = await Chat.findOne({members:{$all:[req.body.senderId,req.body.recieverId]}})
        if(chat == null){
            const newChat = new Chat({
                members: [req.body.senderId,req.body.recieverId]
            })
            const result = await newChat.save()
            res.json(result)
        }else{
            res.json(false)
        }
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function userChats(req, res) {
    try {
        const chat = await Chat.find({
            members:{$in:[req.query.userId]}
        }).sort({updatedAt: -1})
        res.json(chat)
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function findChat(req, res) {
    try {
        const chat = await Chat.findOne({
            members:{$all:[req.query.firstId, req.query.secondId]}
        })
        res.json(chat)
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getUser(req, res) {
    try {
        const user = await User.findById(req.query.userId)
        const vendor = await Vendor.findById(req.query.userId)
        const details = user ? user : vendor
        res.json(details)
    } catch (error) {
        console.log(error)
    }
}