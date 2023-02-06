import { Router } from 'express';
const router = Router();
import { vendorSignUp, vendorSignIn, vendorAuth, addPost, getPosts, editProfile, removeProfilePhoto, getAllPosts, likedPost } from '../controller/vendorController.js';
import { getJobs } from '../controller/workController.js';
import { vendorJWT } from '../middleware/auth.js';

// Authentication
router.post('/signup', vendorSignUp)
router.post('/signin', vendorSignIn)
router.post('/vendorAuth', vendorJWT,vendorAuth )

// Posts
router.post('/add_post', addPost)
router.get('/get_posts', getPosts)
router.get('/get_all_posts', getAllPosts)

// Profile
router.put('/edit_profile', editProfile)
router.patch('/remove_profile_photo', removeProfilePhoto)

// Works
router.get('/get_jobs', getJobs)

//
router.patch('/liked_post', likedPost)

export default router;