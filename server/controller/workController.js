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
        // const users = await User.find({
        //     firstName: { $regex: new RegExp(`^${word}.*`, "i") },
        // })
        const vendors = await Vendor.find({
            firstName: { $regex: new RegExp(`^${word}.*`, "i") },
        })
        // let allPeople = [...users,...vendors]
        let allPeople = vendors
        res.json({allPeople});
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function connectWithPeople(req, res) {
    try {
        const user = await User.findById(req.query.followingId)
        const vendor = await Vendor.findById(req.query.followingId)

        const existuserId = await Connection.findOne({userId:req.query.userId})

        if (existuserId) {
            const exist = await Connection.findOne({connections:{ "$in": [req.query.userId] }})
            await Connection.updateOne({userId:req.query.userId},{
                $push:{
                    connections:{
                        connectorId:req.query.followingId
                    }
                }
            })
        } else {
            await Connection.create({userId:req.query.userId})
            await Connection.updateOne({userId:req.query.userId},{
                $push:{
                    connections:{
                        connectorId:req.query.followingId
                    }
                }
            })
        }

        const follower = await Connection.findOne({connections:{ "$in": [req.query.userId] }})
        if (follower != null) {
            await Connection.updateOne({userId:req.query.followingId ,  "connections.$.connectorId":req.query.followingId},{
                $set:{
                    "connections.$.status":'connected'
                }
            })
        }

        res.json();
    } catch (error) {
        console.log(error)
    }
}