import { Router } from 'express';
const router = Router();
import { userSignUp, userSignIn } from '../controller/userConroller.js';

// Authentication

router.post('/signup', userSignUp)
router.post('/signin', userSignIn)

export default router;