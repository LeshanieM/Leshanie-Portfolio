import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getEducation, createEducation, updateEducation, deleteEducation } from '../controllers/educationController.js';

const router = express.Router();

router.get('/', getEducation);
router.post('/', protect, createEducation);
router.put('/:id', protect, updateEducation);
router.delete('/:id', protect, deleteEducation);

export default router;
