import { Router } from 'express';
const router = Router();
import { vendorSignUp, vendorSignIn, vendorAuth } from '../controller/vendorController.js';
import { adminJWT } from '../middleware/auth.js';

// Authentication

router.post('/signup', vendorSignUp)
router.post('/signin', vendorSignIn)
router.post('/vendorAuth', adminJWT,vendorAuth )

export default router;