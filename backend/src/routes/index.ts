import express from 'express';
import authRoutes from './auth';
import userRoutes from './users';
import testRoutes from './tests';
import leaderboardRoutes from './leaderboard';

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/tests', testRoutes);
router.use('/leaderboard', leaderboardRoutes);

export default router;
