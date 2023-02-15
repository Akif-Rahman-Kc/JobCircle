import { Router } from 'express';
import { addComment, addPost, deleteComment, deletePost, editPost, getAllPosts, getPosts, likedPost, reportPost } from '../controller/postController.js';
const router = Router();
import { vendorSignUp, vendorSignIn, vendorAuth, vendorEditProfile, VendorRemoveProfilePhoto } from '../controller/vendorController.js';
import { getJobs } from '../controller/workController.js';
import { vendorJWT } from '../middleware/auth.js';

// Authentication
router.post('/signup', vendorSignUp)
router.post('/signin', vendorSignIn)
router.post('/vendorAuth', vendorJWT,vendorAuth )

// Posts
router.post('/add_post', vendorJWT,addPost)
router.patch('/edit_post', editPost)
router.delete('/delete_post', deletePost)
router.patch('/report_post', reportPost)
router.get('/get_posts', vendorJWT,getPosts)
router.get('/get_all_posts', vendorJWT,getAllPosts)
router.patch('/liked_post', likedPost)
router.patch('/add_comment', addComment)
router.patch('/delete_comment', deleteComment)

// Profile
router.put('/edit_profile', vendorJWT,vendorEditProfile)
router.patch('/remove_profile_photo', vendorJWT,VendorRemoveProfilePhoto)

// Works
router.get('/get_jobs', vendorJWT,getJobs)

export default router;