import { hash, compare } from 'bcrypt'
import Vendor from '../model/vendorSchema.js'
import jwt from 'jsonwebtoken'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function vendorSignUp(req, res) {
    try {
        const vendorUser = await Vendor.findOne({ email: req.body.data.email })

        if (vendorUser) {
            res.json({status:"failed"})
        } else {
            let vendorDetails = req.body.data
            vendorDetails.password = await hash(vendorDetails.password, 10)
            await Vendor.create(vendorDetails)
            res.json({status:"success"})
        }
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function vendorSignIn(req, res) {
    try {
        const vendor = await Vendor.findOne({ email: req.body.data.email })

        if (vendor) {
            const isMatch = await compare(req.body.data.password, vendor.password)
            if (isMatch) {
                const vendorId = vendor._id
                const token = jwt.sign({ vendorId }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 })
                res.json({ auth: true, token: token, result: vendor, status: "success", message: "signin success" })
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