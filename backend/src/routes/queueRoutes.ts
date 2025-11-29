import express from 'express';
import { getQueueStatus, nextPatient } from '../controllers/queueController';

const router = express.Router();

// Get queue status for a doctor
router.get('/:doctorId', getQueueStatus);

// Advance to next patient
router.post('/:doctorId/next', nextPatient);

export default router;
