import { hash, compare } from 'bcrypt'
import User from '../model/userSchema.js'
import Vendor from '../model/vendorSchema.js'
import jwt from 'jsonwebtoken'
import admin from '../firebase/config.js';


//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function userSignUp(req, res) {
    try {
        admin.auth().verifyIdToken(req.headers.firebasetoken).then(async (decodedToken) => {
            if(decodedToken){
                const existUser = await User.findOne({ email: req.body.email })
                if (existUser) {
                    res.json({status:"failed"})
                } else {
                    let userDetails = req.body
                    userDetails.password = await hash(userDetails.password, 10)
                    await User.create(userDetails)
                    const user = await User.findOne({ email: userDetails.email })
                    const userId = user._id
                    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 })
                    res.json({auth: true, token: token,status:"success"})
                }
            }else{
                res.json({status:"invalid"})
            }
        })
        
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function userSignIn(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            const isMatch = await compare(req.body.password, user.password)
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
        if (userDetails) {
            res.json({userObj:userDetails,auth:true})
        } else {
            res.json({auth:false})
        }

        
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function editProfile(req, res) {
    try {
        const user =  await User.findById(req.query.userId)
        if (user.email === req.body.email) {
            if (req.body.image) {
                await User.updateOne({_id:req.query.userId},{
                    image:req.body.image,
                })
            }
            await User.updateOne({_id:req.query.userId},{
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                locality:req.body.locality,
                city:req.body.city,
                state:req.body.state,
            })
            res.json({status:"success"})
        } else {
            const existUser =  await User.findOne({ email: req.body.email })
            if (existUser) {
                res.json({status:"failed"})
            } else {
                if (req.body.image) {
                    await User.updateOne({_id:req.query.userId},{
                        image:req.body.image,
                    })
                }
                await User.updateOne({_id:req.query.userId},{
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    locality:req.body.locality,
                    city:req.body.city,
                    state:req.body.state,
                    email:req.body.email
                })
                res.json({status:"success"})
            }
        }
        
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function removeProfilePhoto(req, res) {
    try {
        await User.updateOne({_id:req.query.userId},{
            image:'',
        })
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function savedVendors(req, res) {
    try {
        const user = await User.findById(req.query.userId)
        const vendor = await Vendor.findById(req.query.vendorId)
        const exist = user.Saved.find((obj)=> obj.vendorId.toString() === req.query.vendorId.toString())
        if (exist) {
            await User.updateOne({_id:req.query.userId},{
                $pull:{
                    Saved:{
                        vendorId:req.query.vendorId,
                    }
                }
            })
        } else {
            await User.updateOne({_id:req.query.userId},{
                $push:{
                    Saved:{
                        vendorId:req.query.vendorId,
                        vendorName:vendor.firstName + ' ' + vendor.lastName,
                        vendorImage:vendor.image,
                        vendorPlace:vendor.locality + ' ' + vendor.city
                    }
                }
            })
        }
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function reportVendor(req, res) {
    try {
        const vendor = await Vendor.findById(req.body.reporterId)
        const user = await User.findById(req.body.reporterId)
        const vend = await Vendor.findById(req.body.vendorId)
        const exist = vend.Reports.find((obj)=> obj.reporterId.toString() === req.body.reporterId.toString())
        if (exist) {
            res.json({status:'failed'})
        } else {
            await Vendor.updateOne({_id:req.body.vendorId},{
                $push:{
                    Reports:{
                        reporterId:req.body.reporterId,
                        reportMessage:req.body.message,
                        reporterName:vendor ? vendor.firstName + ' ' + vendor.lastName : user.firstName + ' ' + user.lastName,
                        reporterImage:vendor ? vendor.image : user.image, 
                    }
                }
            })
            res.json({status:'success'})
        }
    } catch (error) {
        console.log(error)
    }
}