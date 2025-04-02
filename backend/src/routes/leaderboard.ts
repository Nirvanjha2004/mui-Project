import express from 'express';
import { 
  getOverallLeaderboard,
  getTestLeaderboard,
  getUserRanking
} from '../controllers/leaderboardController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Protect all routes
router.use(protect);

// Leaderboard routes
router.get('/', getOverallLeaderboard);
router.get('/test/:testId', getTestLeaderboard);
router.get('/user/:userId', getUserRanking);

export default router;
