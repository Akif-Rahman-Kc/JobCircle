import { Router } from 'express';
const router = Router();
import { userSignUp, userSignIn, userAuth, editProfile, removeProfilePhoto, savedVendors, reportVendor } from '../controller/userConroller.js';
import { connectWithPeople, getAllConnectors, getJobs, getWorker, getWorkers, searchAllPeople } from '../controller/workController.js';
import { getAllPosts } from '../controller/postController.js';
import { userJWT } from '../middleware/auth.js';
import { createChat, findChat, getUser, userChats } from '../controller/chatController.js';
import { addMessage, getMessages } from '../controller/messageController.js';
import { addBooking } from '../controller/bookingController.js';
import { addNotification, getNotifications } from '../controller/notificationController.js';

// Authentication

router.post('/signup', userSignUp)
router.post('/signin', userSignIn)
router.post('/userAuth', userJWT,userAuth)

// Profile
router.put('/edit_profile', userJWT,editProfile)
router.patch('/remove_profile_photo', userJWT,removeProfilePhoto)

// Saved Vendors
router.patch('/saved_vendors', userJWT,savedVendors)

// Posts
router.get('/get_all_posts', userJWT,getAllPosts)

// Works
router.get('/get_jobs', userJWT,getJobs)
router.get('/get_workers', getWorkers)
router.get('/get_worker', getWorker)

// Search
router.get('/search', searchAllPeople)

// Connect
router.patch('/connect', connectWithPeople)
router.get('/get_all_connectors', getAllConnectors)

// Chats
router.post('/create_chat', createChat)
router.get('/get_chats', userChats)
router.get('/get_specific_chat', findChat)
router.get('/get_user', getUser)

// Messages
router.post('/add_message', addMessage)
router.get('/get_messages', getMessages)

// Notifications
router.post('/add_notification', addNotification)
router.get('/get_notifications', getNotifications)

//Booking
router.post('/add_booking', addBooking)
// router.get('/get_user_bookings', getUserBooking)

// Report Vendor
router.patch('/report_vendor', reportVendor)

export default router;