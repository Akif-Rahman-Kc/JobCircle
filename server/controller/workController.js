import Job from '../model/jobSchema.js'
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

        res.json(vendor)
    } catch (error) {
        console.log(error)
    }
}