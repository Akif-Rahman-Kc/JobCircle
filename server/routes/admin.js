import { Router } from 'express';
const router = Router();
import { adminAuth, adminSignIn, getUsers, getVendors, userActive, userBlock, vendorActive, vendorBlock } from '../controller/adminController.js';
import { adminJWT } from '../middleware/auth.js';

// Authentication
router.post('/signin', adminSignIn)
router.post('/adminAuth', adminJWT,adminAuth)

// Get Users
router.get('/get_users', adminJWT,getUsers)

// Get Vendors
router.get('/get_vendors', adminJWT,getVendors)

//Block & Active
router.patch('/user_blocked', adminJWT,userBlock)
router.patch('/user_actived', adminJWT,userActive)
router.patch('/vendor_blocked', adminJWT,vendorBlock)
router.patch('/vendor_actived', adminJWT,vendorActive)

export default router;