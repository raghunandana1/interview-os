import { Router } from 'express';
import { exportSnapshot, importSnapshot, resetDemoData } from '../controllers/syncController.js';

const router = Router();

router.get('/export', exportSnapshot);
router.post('/import', importSnapshot);
router.post('/reset', resetDemoData);

export default router;
