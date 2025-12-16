import { Router } from 'express';
import { aiController } from '../controllers/ai.controller.js';

const router = Router();

router.get('/moods', (req, res) => aiController.getMoods(req, res));

router.post('/recommend', (req, res) => aiController.getRecommendations(req, res));

export default router;
