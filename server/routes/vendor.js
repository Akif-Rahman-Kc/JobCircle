import { Router } from 'express';
const router = Router();
import { vendorSignUp, vendorSignIn, vendorAuth } from '../controller/vendorController.js';
import { vendorJWT } from '../middleware/auth.js';

// Authentication

router.post('/signup', vendorSignUp)
router.post('/signin', vendorSignIn)
router.post('/vendorAuth', vendorJWT,vendorAuth )

export default router;