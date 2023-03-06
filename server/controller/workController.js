import Job from '../model/jobSchema.js'
import User from '../model/userSchema.js'
import Vendor from '../model/vendorSchema.js'
import Connection from '../model/connectionSchema.js'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getJobs(req, res) {
    try {
        const jobs = await Job.find()

        res.json(jobs)
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getWorkers(req, res) {
    try {
        const vendors = await Vendor.find({job:req.query.jobName})

        res.json(vendors)
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getWorker(req, res) {
    try {
        const vendor = await Vendor.findById(req.query.vendorId)
        const user = await User.findById(req.query.vendorId)
        if (vendor) {
            res.json({vendor:vendor})
        } else {
            res.json({user:user})
        }
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function searchAllPeople(req, res) {
    try {
        const word = req.query.vlaue.trim();
        const users = await User.find({
            firstName: { $regex: new RegExp(`^${word}.*`, "i") },
        })
        const vendors = await Vendor.find({
            firstName: { $regex: new RegExp(`^${word}.*`, "i") },
        })
        let allPeople = [...users,...vendors]
        res.json({allPeople});
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function connectWithPeople(req, res) {
    try {
        let con = false
        const { userId, followingId } = req.query
        const user = await User.findById(followingId)
        const vendor = await Vendor.findById(followingId)

        const existuserId = await Connection.findOne({userId:userId})
        if (existuserId) {
            const existFollowingId = existuserId.connections.find((obj)=>obj.connectorId.toString() === followingId.toString())
            if (existFollowingId) {
                await Connection.updateOne({userId:userId},{
                    $pull:{
                        connections:{
                            connectorId:followingId,
                        }
                    }
                })
            } else {
                await Connection.updateOne({userId:userId},{
                    $push:{
                        connections:{
                            connectorId:followingId,
                            connectorName:vendor? vendor.firstName + ' ' + vendor.lastName : user.firstName + ' ' + user.lastName,
                            connectorImage:vendor? vendor.image : user.image
                        }
                    }
                })
                con = true
            }
            
        } else {
            await Connection.create({userId:userId})
            await Connection.updateOne({userId:userId},{
                $push:{
                    connections:{
                        connectorId:followingId,
                        connectorName:vendor? vendor.firstName + ' ' + vendor.lastName : user.firstName + ' ' + user.lastName,
                        connectorImage:vendor? vendor.image : user.image
                    }
                }
            })
            con = true
        }

        const follower = await Connection.findOne({userId:followingId})
        if (follower != null) {
            const existUserIn = follower.connections.find((obj)=>obj.connectorId.toString() === userId.toString())
            if (existUserIn?.status === 'pending' ) {
                await Connection.updateOne({userId:followingId ,  "connections.connectorId":userId},{
                    $set:{
                        "connections.$.status":'connected'
                    }
                })
                await Connection.updateOne({userId:userId ,  "connections.connectorId":followingId},{
                    $set:{
                        "connections.$.status":'connected'
                    }
                })
            }else{
                await Connection.updateOne({userId:followingId ,  "connections.connectorId":userId},{
                    $set:{
                        "connections.$.status":'pending'
                    }
                })
            }
        }
        console.log(con);
        res.json({status:'success', connection:con});
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getAllConnectors(req, res) {
    try {
        let connection = await Connection.findOne({userId:req.query.userId})
        res.json(connection);
    } catch (error) {
        console.log(error)
    }
}