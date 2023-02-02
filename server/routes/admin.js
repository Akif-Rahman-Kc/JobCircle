import { Router } from 'express';
const router = Router();
import { adminAuth, adminSignIn, getUsers, getVendors } from '../controller/adminController.js';
import { adminJWT } from '../middleware/auth.js';

// Authentication

router.post('/signin', adminSignIn)
router.post('/adminAuth', adminJWT,adminAuth)

// Get Users

router.get('/get_users',getUsers)

// Get Vendors

router.get('/get_vendors',getVendors)

export default router;