import { hash, compare } from 'bcrypt'
import Vendor from '../model/vendorSchema.js'
import Post from '../model/postSchema.js'
import jwt from 'jsonwebtoken'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function vendorSignUp(req, res) {
    try {
        const vendorUser = await Vendor.findOne({ email: req.body.email })

        if (vendorUser) {
            res.json({status:"failed"})
        } else {
            let vendorDetails = req.body
            vendorDetails.password = await hash(vendorDetails.password, 10)
            await Vendor.create(vendorDetails)
            const vendor = await Vendor.findOne({ email: vendorDetails.email })
            const vendorId = vendor._id
            const token = jwt.sign({ vendorId }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 })
            res.json({auth: true, token: token,status:"success"})
        }
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function vendorSignIn(req, res) {
    try {
        const vendor = await Vendor.findOne({ email: req.body.email })

        if (vendor) {
            const isMatch = await compare(req.body.password, vendor.password)
            if (isMatch) {
                const vendorId = vendor._id
                const token = jwt.sign({ vendorId }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 })
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

export async function vendorAuth(req, res) {
    try {
        let vendorDetails = await Vendor.findById(req.vendorId)
        vendorDetails.auth = true

        res.json({vendorObj:vendorDetails,auth:true})
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function addPost(req, res) {
    try {
        await Post.create(req.body)

        res.json()
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getPosts(req, res) {
    try {
        const posts = await Post.find({vendorId:req.query.vendorId}).sort({createdAt:-1})

        res.json(posts)
    } catch (error) {
        console.log(error)
    }
}

// const posts = await Post.find().populate("vendorId")