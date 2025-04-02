import express from 'express';
import { 
  createTest,
  getAllTests,
  getTestById,
  updateTest,
  deleteTest,
  submitTestResult 
} from '../controllers/testController';
import { protect, authorizeRoles } from '../middleware/auth';

const router = express.Router();

// Protect all routes
router.use(protect);

// Test routes
router.route('/')
  .get(getAllTests)
  .post(authorizeRoles('admin'), createTest);

router.route('/:id')
  .get(getTestById)
  .put(authorizeRoles('admin'), updateTest)
  .delete(authorizeRoles('admin'), deleteTest);

// Submit test result
router.post('/submit', submitTestResult);

export default router;
