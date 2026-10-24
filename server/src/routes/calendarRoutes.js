import { Router } from 'express';
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/calendarController.js';

const router = Router();

router.route('/')
  .get(getEvents)
  .post(createEvent);

router.route('/:id')
  .patch(updateEvent)
  .put(updateEvent)
  .delete(deleteEvent);

export default router;
