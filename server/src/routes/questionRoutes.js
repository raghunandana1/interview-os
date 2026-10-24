import { Router } from 'express';
import {
  getQuestions,
  createQuestion,
  updateQuestion,
  recordDrill,
  deleteQuestion,
} from '../controllers/questionController.js';

const router = Router();

router.route('/')
  .get(getQuestions)
  .post(createQuestion);

router.post('/:id/drill', recordDrill);

router.route('/:id')
  .patch(updateQuestion)
  .put(updateQuestion)
  .delete(deleteQuestion);

export default router;
