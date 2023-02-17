import { Router } from 'express';
const router = Router();
import { userSignUp, userSignIn, userAuth, editProfile, removeProfilePhoto, savedVendors } from '../controller/userConroller.js';
import { connectWithPeople, getJobs, getWorker, getWorkers, searchAllPeople } from '../controller/workController.js';
import { getAllPosts } from '../controller/postController.js';
import { userJWT } from '../middleware/auth.js';

// Authentication

router.post('/signup', userSignUp)
router.post('/signin', userSignIn)
router.post('/userAuth', userJWT,userAuth)

// Profile
router.put('/edit_profile', userJWT,editProfile)
router.patch('/remove_profile_photo', userJWT,removeProfilePhoto)

// Saved Vendors
router.patch('/saved_vendors', userJWT,savedVendors)

//Posts
router.get('/get_all_posts', userJWT,getAllPosts)

// Works
router.get('/get_jobs', userJWT,getJobs)
router.get('/get_workers', getWorkers)
router.get('/get_worker', getWorker)

//Search
router.get('/search', searchAllPeople)

//Connect
router.patch('/connect', connectWithPeople)

export default router;