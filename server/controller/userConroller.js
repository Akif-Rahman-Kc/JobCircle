const bcrypt = require('bcrypt')
const User = require('../model/userSchema')

module.exports = {
    userSignUp: async (req, res) => {
        try {
            console.log(req.body,"---");
            // const Email = req.body.data.email;

            // const oldUser = await User.findOne({ email: Email });
            // if (oldUser) {
            //     console.log("email already created");
            // } else {
            //     try {
            //         let userDetails = req.body.data;
            //         console.log(userDetails.password);
            //         userDetails.password = await bcrypt.hash(userDetails.password, 10);
            //         await User.create(userDetails)
            //         res.json("Registered")
            //     } catch (error) {
            //         console.log(error.message);
            //     }
            // }
            res.json()
        } catch (error) {
            console.log(error);
        }
    },
    userSignUpDetails: async (req, res) => {
        try {
            console.log(req.body,"===");
            res.json()
        } catch (error) {
            console.log(error);
        }
    },
}