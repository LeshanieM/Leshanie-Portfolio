import express from 'express';
import { getPortfolioData, getHealth } from '../controllers/portfolioController.js';

const router = express.Router();

router.get('/portfolio', getPortfolioData);
router.get('/health', getHealth);

export default router;
