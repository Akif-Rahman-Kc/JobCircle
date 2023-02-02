import { Router } from 'express';
const router = Router();
import { vendorSignUp, vendorSignIn, vendorAuth, addPost, getPosts } from '../controller/vendorController.js';
import { vendorJWT } from '../middleware/auth.js';

// Authentication

router.post('/signup', vendorSignUp)
router.post('/signin', vendorSignIn)
router.post('/vendorAuth', vendorJWT,vendorAuth )

// Posts

router.post('/add_post', addPost)
router.get('/get_posts', getPosts)

export default router;