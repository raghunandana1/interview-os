import { Router } from 'express';
import { getCheatSheet, updateCheatSheet } from '../controllers/cheatSheetController.js';

const router = Router();

router.route('/')
  .get(getCheatSheet)
  .put(updateCheatSheet)
  .patch(updateCheatSheet);

export default router;
