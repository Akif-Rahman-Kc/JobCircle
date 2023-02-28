import Admin from '../model/adminSchema.js'
import User from '../model/userSchema.js'
import Job from '../model/jobSchema.js'
import Post from '../model/postSchema.js'
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
        const users = await User.find().sort({createdAt:-1})

        res.json(users)
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getVendors(req, res) {
    try {
        const vendors = await Vendor.find().sort({createdAt:-1})

        res.json(vendors)
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function adminGetJobs(req, res) {
    try {
        const jobs = await Job.find().sort({createdAt:-1})

        res.json(jobs)
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function userBlock(req, res) {
    try {
        await User.updateOne({_id:req.query.userId},{
            isBlock:true
        })
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function userActive(req, res) {
    try {
        await User.updateOne({_id:req.query.userId},{
            isBlock:false
        })
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function vendorBlock(req, res) {
    try {
        await Vendor.updateOne({_id:req.query.vendorId},{
            isBlock:true
        })
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function vendorActive(req, res) {
    try {
        await Vendor.updateOne({_id:req.query.vendorId},{
            isBlock:false
        })
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function deleteJobs(req, res) {
    try {
        const job = await Job.findById(req.query.jobId)
        const vendor = await Vendor.findOne({job:job.jobName})
        if (vendor) {
            res.json({status:"failed"})
        } else {
            await Job.remove({_id:req.query.jobId})
            res.json({status:"success"})
        }
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function allReportPosts(req, res) {
    try {
        const posts = await Post.find()
        const reportPosts = posts.filter((doc)=> doc.Reports.length > 0)
        res.json({status:'success' , reportPosts})
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function deleteReportPost(req, res) {
    try {
        await Post.deleteOne({_id:req.query.postId})
        
        res.json(true)
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function allReportVendors(req, res) {
    try {
        const vendors = await Vendor.find()
        const reportVendors = vendors.filter((doc)=> doc.Reports.length > 0)
        res.json({status:'success' , reportVendors})
    } catch (error) {
        console.log(error)
    }
}