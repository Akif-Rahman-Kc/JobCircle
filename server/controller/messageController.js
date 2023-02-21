import Message from '../model/messageSchema.js'

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
        res.json(result)
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getMessages(req, res) {
    try {
        const { chatId } = req.query
        const result = await Message.find({chatId})
        res.json(result)
    } catch (error) {
        console.log(error)
    }
}