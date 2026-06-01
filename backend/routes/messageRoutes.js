import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { submitMessage, getMessages, deleteMessage } from '../controllers/messageController.js';

const router = express.Router();

// Public route to submit contact form
router.post('/', submitMessage);

// Protected routes for admin
router.get('/', protect, getMessages);
router.delete('/:id', protect, deleteMessage);

export default router;
