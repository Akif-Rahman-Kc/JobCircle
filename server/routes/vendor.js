import { Router } from 'express';
import { acceptBooking, declineBooking, getBookings } from '../controller/bookingController.js';
import { addComment, addPost, deleteComment, deletePost, editPost, getAllPosts, getPosts, likedPost, reportPost } from '../controller/postController.js';
const router = Router();
import { vendorSignUp, vendorSignIn, vendorAuth, vendorEditProfile, VendorRemoveProfilePhoto } from '../controller/vendorController.js';
import { getAllConnectors, getJobs, searchAllPeople } from '../controller/workController.js';
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
router.get('/get_posts', getPosts)
router.get('/get_all_posts', vendorJWT,getAllPosts)
router.patch('/liked_post', likedPost)
router.patch('/add_comment', addComment)
router.patch('/delete_comment', deleteComment)

// Profile
router.put('/edit_profile', vendorJWT,vendorEditProfile)
router.patch('/remove_profile_photo', vendorJWT,VendorRemoveProfilePhoto)

// Works
router.get('/get_jobs', vendorJWT,getJobs)

//Search
router.get('/search', searchAllPeople)

//Connect
router.get('/get_all_connectors', getAllConnectors)

// Bookings
router.get('/get_bookings', vendorJWT,getBookings)
router.patch('/accept_booking', vendorJWT,acceptBooking)
router.patch('/decline_booking', vendorJWT,declineBooking)

export default router;