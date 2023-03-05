import Message from '../model/messageSchema.js'
import Chat from '../model/chatSchema.js'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function addMessage(req, res) {
    try {
        const { chatId, senderId, text } = req.body
        const message = new Message({
            chatId,
            senderId,
            text
        })
        const result = await message.save()
        await Chat.updateOne({_id:req.body.chatId},{
            sortHelper:Math.random()
        })
        res.json(result)
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getMessages(req, res) {
    try {
        const { chatId, userId } = req.query
        await Message.updateMany({senderId:userId},{
            readed:true
        })
        const result = await Message.find({chatId})
        res.json(result)
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getReadedMessages(req, res) {
    try {
        const { userId } = req.query
        console.log("-++++++--");
        console.log(userId,"---");
        const result = await Message.find({senderId:userId, readed:false})
        res.json({result:result.length})
    } catch (error) {
        console.log(error)
    }
}