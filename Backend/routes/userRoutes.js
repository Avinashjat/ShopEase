import express from 'express';
import {sendOtp ,  verifyOtp , completeProfile ,getProfile} from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/send-otp', sendOtp);

router.post('/verify-otp', verifyOtp);



router.post('/complete-profile', authMiddleware ,  upload.single("profilePhoto"), completeProfile);

router.get('/profile', authMiddleware, getProfile);

export default router;
