import { Router } from 'express';
import { gamesController } from '../controllers/games.controller.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = Router();

router.get('/', (req, res) => gamesController.getAll(req, res));

router.get('/:id', (req, res) => gamesController.getById(req, res));

router.post('/', adminAuth, (req, res) => gamesController.create(req, res));

router.patch('/:id', adminAuth, (req, res) => gamesController.update(req, res));

router.delete('/:id', adminAuth, (req, res) => gamesController.delete(req, res));

export default router;
