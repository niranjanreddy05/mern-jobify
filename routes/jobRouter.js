import { Router } from 'express';
import { validateJob, validateIdParam } from '../middleware/validationMiddleware.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';
const router = Router();

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from '../controllers/jobController.js';

router.route('/').get(getAllJobs).post(checkForTestUser, validateJob, createJob)
router.route('/stats').get(showStats)
router.route('/:id').get(validateIdParam, getJob).patch(checkForTestUser ,validateJob, updateJob).delete(checkForTestUser, validateIdParam, deleteJob);

export default router;