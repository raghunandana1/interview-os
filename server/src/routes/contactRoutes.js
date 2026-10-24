import { Router } from 'express';
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js';

const router = Router();

router.route('/')
  .get(getContacts)
  .post(createContact);

router.route('/:id')
  .patch(updateContact)
  .put(updateContact)
  .delete(deleteContact);

export default router;
