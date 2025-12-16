import { Router } from 'express';
import { favoritesController } from '../controllers/favorites.controller.js';

const router = Router();

router.get('/', (req, res) => favoritesController.getByUser(req, res));

router.get('/check', (req, res) => favoritesController.check(req, res));

router.post('/', (req, res) => favoritesController.add(req, res));

router.delete('/', (req, res) => favoritesController.remove(req, res));

export default router;
