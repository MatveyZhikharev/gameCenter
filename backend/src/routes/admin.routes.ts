import { Router } from 'express';
import { adminAuth } from '../middleware/adminAuth.js';

const router = Router();

router.post('/login', adminAuth, (_req, res) => {
  res.json({ ok: true });
});

export default router;
