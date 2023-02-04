import { Router } from 'express';
const router = Router();
import { userSignUp, userSignIn, userAuth } from '../controller/userConroller.js';
import { getJobs, getWorkers } from '../controller/workController.js';
import { userJWT } from '../middleware/auth.js';

// Authentication

router.post('/signup', userSignUp)
router.post('/signin', userSignIn)
router.post('/userAuth', userJWT,userAuth)

// Works

router.get('/get_jobs', getJobs)
router.get('/get_workers', getWorkers)

export default router;