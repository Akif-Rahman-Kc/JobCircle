import { hash, compare } from 'bcrypt'
import Vendor from '../model/vendorSchema.js'
import Job from '../model/jobSchema.js'
import jwt from 'jsonwebtoken'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function vendorSignUp(req, res) {
    try {
        const existVendor = await Vendor.findOne({ email: req.body.email })

        if (existVendor) {
            res.json({status:"failed"})
        } else {
            let vendorDetails = req.body
            vendorDetails.password = await hash(vendorDetails.password, 10)
            await Vendor.create(vendorDetails)
            const vendor = await Vendor.findOne({ email: vendorDetails.email })
            const vendorId = vendor._id
            const token = jwt.sign({ vendorId }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 })
            //job adding
            const existJob = await Job.findOne({jobName:vendorDetails.job})
            if (!existJob) {
                const job = {
                    jobName:vendorDetails.job
                }
                await Job.create(job)
            }
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
        if (vendorDetails) {
            res.json({vendorObj:vendorDetails,auth:true})
        } else {
            res.json({auth:false})
        }
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function vendorEditProfile(req, res) {
    try {
        const vendor =  await Vendor.findById(req.query.vendorId)
        if (vendor.email === req.body.email) {
            if (req.body.image) {
                await Vendor.updateOne({_id:req.query.vendorId},{
                    image:req.body.image,
                })
            }
            await Vendor.updateOne({_id:req.query.vendorId},{
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                locality:req.body.locality,
                city:req.body.city,
                state:req.body.state,
                job:req.body.job,
                experiance:req.body.experiance,
                jobDays:req.body.jobDays
            })
            res.json({status:"success"})
        } else {
            const existVendor =  await Vendor.findOne({ email: req.body.email })
            if (existVendor) {
                res.json({status:"failed"})
            } else {
                if (req.body.image) {
                    await Vendor.updateOne({_id:req.query.vendorId},{
                        image:req.body.image,
                    })
                }
                await Vendor.updateOne({_id:req.query.vendorId},{
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    locality:req.body.locality,
                    city:req.body.city,
                    state:req.body.state,
                    email:req.body.email,
                    job:req.body.job,
                    experiance:req.body.experiance,
                    jobDays:req.body.jobDays
                })
                res.json({status:"success"})
            }
        }
        
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function VendorRemoveProfilePhoto(req, res) {
    try {
        await Vendor.updateOne({_id:req.query.vendorId},{
            image:'',
        })
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}