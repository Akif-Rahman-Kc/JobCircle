const bcrypt = require('bcrypt')
const User = require('../model/userSchema')
const jwt = require('jsonwebtoken')

module.exports = {
    userSignUp: async (req, res) => {
        try {

            const existUser = await User.findOne({email:req.body.data.email})

            if (existUser) {
                console.log("email already registerd");
            } else {
                let userDetails = req.body.data
                userDetails.password = await bcrypt.hash(userDetails.password, 10)
                await User.create(userDetails)
                res.json('Registered')
            }
        } catch (error) {
            console.log(error);
        }
    },
    userSignIn: async (req, res) => {
        try {
            const user = await User.findOne({email:req.body.data.email})
            
            if (user) {
                const isMatch = await bcrypt.compare(req.body.data.password, user.password)
                if (isMatch) {
                    const userId = user._id
                    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, { expiresIn: 60*60*24 })
                    res.json({auth:true, token:token, result:user, status: "success", message: "signin success" })
                } else {
                    res.json({auth:false, passwordErr:true , status: "failed", message: "Your Password is Incorrect" })
                }
            } else {
                res.json({auth:false, emailErr:true, status: "failed", message: "Your Email is Incorrect" })
            }
        } catch (error) {
            console.log(error);
        }
    },
}