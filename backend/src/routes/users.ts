import express from 'express';
import { 
  getUserProfile, 
  updateUserProfile, 
  getUserResults,
  getUserStatistics 
} from '../controllers/userController';
import { protect, authorizeRoles } from '../middleware/auth';

const router = express.Router();

// Protect all routes
router.use(protect);

// User profile routes
router.get('/:id', getUserProfile);
router.put('/:id', updateUserProfile);

// User test results routes
router.get('/:id/results', getUserResults);
router.get('/:id/statistics', getUserStatistics);

// Admin-only routes
router.get('/', authorizeRoles('admin'), async (req, res) => {
  res.send('Get all users - Admin only');
});

export default router;
