import Admin from '../model/adminSchema.js'
import User from '../model/userSchema.js'
import Vendor from '../model/vendorSchema.js'
import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function adminSignIn(req, res) {
    try {
        // req.body.password = await hash(req.body.password, 10)
        // req.body.name = "Job Circle"
        // await Admin.create(req.body)

        const admin = await Admin.findOne({ email: req.body.email })

        if (admin) {
            const isMatch = await compare(req.body.password, admin.password)
            if (isMatch) {
                const adminId = admin._id
                const token = jwt.sign({ adminId }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 })
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

export async function adminAuth(req, res) {
    try {
        let adminDetails = await Admin.findById(req.adminId)
        adminDetails.auth = true

        res.json({email:adminDetails.email,auth:true,image:adminDetails.image||null})
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getUsers(req, res) {
    try {
        const users = await User.find()

        res.json(users)
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getVendors(req, res) {
    try {
        const vendors = await Vendor.find()

        res.json(vendors)
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////