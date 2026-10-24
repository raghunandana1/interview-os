import { Router } from 'express';
import {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} from '../controllers/applicationController.js';

const router = Router();

router.route('/')
  .get(getApplications)
  .post(createApplication);

router.route('/:id')
  .get(getApplicationById)
  .patch(updateApplication)
  .put(updateApplication)
  .delete(deleteApplication);

export default router;
