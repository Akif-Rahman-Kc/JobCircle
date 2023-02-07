import { hash, compare } from 'bcrypt'
import Vendor from '../model/vendorSchema.js'
import Job from '../model/jobSchema.js'
import Post from '../model/postSchema.js'
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

        res.json(true)
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function editPost(req, res) {
    try {
        await Post.updateOne({_id:req.body.postId},{
            description:req.body.description
        })

        res.json(true)
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function deletePost(req, res) {
    try {
        await Post.deleteOne({_id:req.query.postId})

        res.json(true)
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getAllPosts(req, res) {
    try {
        const posts = await Post.find().populate('vendorId').sort({createdAt:-1})
        res.json(posts)
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function editProfile(req, res) {
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
                experiance:req.body.experiance
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
                    experiance:req.body.experiance
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
        await Vendor.updateOne({_id:req.query.vendorId},{
            image:'',
        })
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function likedPost(req, res) {
    try {
        const vendor = await Vendor.findById(req.query.vendorId)
        const post = await Post.findById(req.query.postId)
        const exist = post.Likes.find((obj)=> obj.vendorId.toString() === req.query.vendorId.toString())
        if (exist) {
            await Post.updateOne({_id:req.query.postId},{
                $pull:{
                    Likes:{
                        vendorId:req.query.vendorId,
                        likerName:vendor.firstName + ' ' + vendor.lastName,
                        likerImage:vendor.image
                    }
                }
            })
        } else {
            await Post.updateOne({_id:req.query.postId},{
                $push:{
                    Likes:{
                        vendorId:req.query.vendorId,
                        likerName:vendor.firstName + ' ' + vendor.lastName,
                        likerImage:vendor.image
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

export async function addComment(req, res) {
    try {
        const vendor = await Vendor.findById(req.body.vendorId)
        var time = new Date()
        await Post.updateOne({_id:req.body.postId},{
            $push:{
                Comments:{
                    vendorId:req.body.vendorId,
                    comment:req.body.comment,
                    writerName:vendor.firstName + ' ' + vendor.lastName,
                    writerImage:vendor.image,
                    time:time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                }
            }
        })
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function deleteComment(req, res) {
    try {
        await Post.updateOne({_id:req.query.postId},{
            $pull:{
                Comments:{
                    _id:req.query.commentId
                }
            }
        })
        res.json({status:"success"})
    } catch (error) {
        console.log(error)
    }
}