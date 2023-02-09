import User from '../model/userSchema.js'
import Vendor from '../model/vendorSchema.js'
import Post from '../model/postSchema.js'

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
        const posts = await Post.find({vendorId:req.query.vendorId}).populate('vendorId').sort({createdAt:-1})

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

export async function likedPost(req, res) {
    try {
        const vendor = await Vendor.findById(req.query.likerId)
        const user = await User.findById(req.query.likerId)
        const post = await Post.findById(req.query.postId)
        const exist = post.Likes.find((obj)=> obj.likerId.toString() === req.query.likerId.toString())
        if (exist) {
            await Post.updateOne({_id:req.query.postId},{
                $pull:{
                    Likes:{
                        likerId:req.query.likerId,
                        likerName:vendor ? vendor.firstName + ' ' + vendor.lastName : user.firstName + ' ' + user.lastName,
                        likerImage:vendor ? vendor.image : user.image,
                    }
                }
            })
        } else {
            await Post.updateOne({_id:req.query.postId},{
                $push:{
                    Likes:{
                        likerId:req.query.likerId,
                        likerName:vendor ? vendor.firstName + ' ' + vendor.lastName : user.firstName + ' ' + user.lastName,
                        likerImage:vendor ? vendor.image : user.image,
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
        const vendor = await Vendor.findById(req.body.writerId)
        const user = await User.findById(req.body.writerId)
        var time = new Date()
        await Post.updateOne({_id:req.body.postId},{
            $push:{
                Comments:{
                    writerId:req.body.writerId,
                    comment:req.body.comment,
                    writerName:vendor ? vendor.firstName + ' ' + vendor.lastName : user.firstName + ' ' + user.lastName,
                    writerImage:vendor ? vendor.image : user.image,
                    writer:vendor ? 'vendor' : "user",
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