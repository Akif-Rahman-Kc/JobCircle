import { Router } from 'express';
const router = Router();
import { vendorSignUp, vendorSignIn } from '../controller/vendorController.js';

// Authentication

router.post('/signup', vendorSignUp)
router.post('/signin', vendorSignIn)

export default router;