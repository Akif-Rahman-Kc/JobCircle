import Job from '../model/jobSchema.js'
import User from '../model/userSchema.js'
import Vendor from '../model/vendorSchema.js'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getJobs(req, res) {
    try {
        const jobs = await Job.find()
        console.log(jobs);

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