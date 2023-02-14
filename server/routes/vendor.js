import { Router } from 'express';
import { addComment, addPost, deleteComment, deletePost, editPost, getAllPosts, getPosts, likedPost, reportPost } from '../controller/postController.js';
const router = Router();
import { vendorSignUp, vendorSignIn, vendorAuth, vendorEditProfile, VendorRemoveProfilePhoto, vendorBlock, vendorActive } from '../controller/vendorController.js';
import { getJobs } from '../controller/workController.js';
import { vendorJWT } from '../middleware/auth.js';

// Authentication
router.post('/signup', vendorSignUp)
router.post('/signin', vendorSignIn)
router.post('/vendorAuth', vendorJWT,vendorAuth )

// Posts
router.post('/add_post', addPost)
router.patch('/edit_post', editPost)
router.delete('/delete_post', deletePost)
router.patch('/report_post', reportPost)
router.get('/get_posts', getPosts)
router.get('/get_all_posts', getAllPosts)
router.patch('/liked_post', likedPost)
router.patch('/add_comment', addComment)
router.patch('/delete_comment', deleteComment)

// Profile
router.put('/edit_profile', vendorEditProfile)
router.patch('/remove_profile_photo', VendorRemoveProfilePhoto)

//Block & Active
router.patch('/blocked', vendorBlock)
router.patch('/actived', vendorActive)

// Works
router.get('/get_jobs', getJobs)

export default router;