import { Router } from 'express';
const router = Router();
import { userSignUp, userSignIn, userAuth } from '../controller/userConroller.js';
import { userJWT } from '../middleware/auth.js';

// Authentication

router.post('/signup', userSignUp)
router.post('/signin', userSignIn)
router.post('/userAuth', userJWT,userAuth)

export default router;