import { Router } from 'express';
const router = Router();
import { userSignUp, userSignIn, userAuth, editProfile, removeProfilePhoto, savedVendors } from '../controller/userConroller.js';
import { getJobs, getWorker, getWorkers } from '../controller/workController.js';
import { userJWT } from '../middleware/auth.js';

// Authentication

router.post('/signup', userSignUp)
router.post('/signin', userSignIn)
router.post('/userAuth', userJWT,userAuth)

// Profile
router.put('/edit_profile', editProfile)
router.patch('/remove_profile_photo', removeProfilePhoto)

// Saved Vendors
router.patch('/saved_vendors', savedVendors)

// Works

router.get('/get_jobs', getJobs)
router.get('/get_workers', getWorkers)
router.get('/get_worker', getWorker)

export default router;