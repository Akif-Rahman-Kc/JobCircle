import { hash, compare } from 'bcrypt'
import User from '../model/userSchema.js'
import jwt from 'jsonwebtoken'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function userSignUp(req, res) {
    try {

        const existUser = await User.findOne({ email: req.body.data.email })

        if (existUser) {
            res.json({status:"failed"})
        } else {
            let userDetails = req.body.data
            userDetails.password = await hash(userDetails.password, 10)
            await User.create(userDetails)
            const user = await User.findOne({ email: userDetails.email })
            const userId = user._id
            const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 })
            res.json({auth: true, token: token,status:"success"})
        }
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function userSignIn(req, res) {
    try {
        const user = await User.findOne({ email: req.body.data.email })

        if (user) {
            const isMatch = await compare(req.body.data.password, user.password)
            if (isMatch) {
                const userId = user._id
                const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 })
                res.json({ auth: true, token: token, status: "success" })
            } else {
                res.json({ auth: false, passwordErr: true, status: "failed", message: "Your Password is Incorrect" })
            }
        } else {
            res.json({ auth: false, emailErr: true, status: "failed", message: "Your Email is Incorrect" })
        }
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function userAuth(req, res) {
    try {
        let userDetails = await User.findById(req.userId)
        userDetails.auth = true

        res.json({username:`${userDetails.firstName} ${userDetails.lastName}`,email:userDetails.email,auth:true,image:userDetails.image||null})
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////