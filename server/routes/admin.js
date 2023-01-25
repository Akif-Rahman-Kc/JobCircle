import { Router } from 'express';
const router = Router();
import { adminAuth, adminSignIn } from '../controller/adminController.js';
import { adminJWT } from '../middleware/auth.js';

// Authentication

router.post('/signin', adminSignIn)
router.post('/adminAuth', adminJWT,adminAuth)

export default router;