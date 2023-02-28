import { Router } from 'express';
const router = Router();
import { adminAuth, adminGetJobs, adminSignIn, allReportPosts, allReportVendors, deleteJobs, deleteReportPost, getUsers, getVendors, userActive, userBlock, vendorActive, vendorBlock } from '../controller/adminController.js';
import { adminJWT } from '../middleware/auth.js';

// Authentication
router.post('/signin', adminSignIn)
router.post('/adminAuth', adminJWT,adminAuth)

// Get Users
router.get('/get_users', adminJWT,getUsers)

// Get Vendors
router.get('/get_vendors', adminJWT,getVendors)

// Get Jobs
router.get('/get_jobs', adminJWT,adminGetJobs)
router.delete('/delete_job', adminJWT,deleteJobs)

// Block & Active
router.patch('/user_blocked', adminJWT,userBlock)
router.patch('/user_actived', adminJWT,userActive)
router.patch('/vendor_blocked', adminJWT,vendorBlock)
router.patch('/vendor_actived', adminJWT,vendorActive)

// Reports
router.get('/all_report_posts', adminJWT,allReportPosts)
router.get('/all_report_vendors', adminJWT,allReportVendors)
router.delete('/delete_post', adminJWT, deleteReportPost)

export default router;