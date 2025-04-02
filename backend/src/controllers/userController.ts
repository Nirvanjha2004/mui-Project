import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Result from '../models/Result';
import mongoose from 'mongoose';

// Get user profile
export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update user profile
export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if user is trying to update their own profile or is an admin
    if (req.params.id !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }
    
    // Fields that can be updated
    const { name, email } = req.body;
    
    // Build update object
    const updateFields: any = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get user test results
export const getUserResults = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if user is trying to access their own results or is an admin
    if (req.params.id !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access these results'
      });
    }
    
    const results = await Result.find({ user: req.params.id })
      .populate('test', 'title description')
      .sort({ completedAt: -1 });
    
    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    next(error);
  }
};

// Get leaderboard
export const getLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit = 10, testId } = req.query;
    
    const pipeline: mongoose.PipelineStage[] = [];
    
    // If testId is provided, filter by it
    if (testId) {
      pipeline.push({
        $match: { test: new mongoose.Types.ObjectId(testId as string) }
      });
    }
    
    // Group by user and calculate statistics
    pipeline.push(
      {
        $group: {
          _id: '$user',
          averageScore: { $avg: '$score' },
          totalTests: { $sum: 1 },
          bestScore: { $max: '$score' }
        }
      },
      {
        $sort: { averageScore: -1 as const }
      },
      {
        $limit: parseInt(limit as string, 10)
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: '$userDetails'
      },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          name: '$userDetails.name',
          averageScore: 1,
          totalTests: 1,
          bestScore: 1
        }
      }
    );
    
    const leaderboard = await Result.aggregate(pipeline);
    
    // Add rank to each entry
    const rankedLeaderboard = leaderboard.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
    
    res.status(200).json({
      success: true,
      count: rankedLeaderboard.length,
      data: rankedLeaderboard
    });
  } catch (error) {
    next(error);
  }
};

// Get user statistics
export const getUserStatistics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if user is trying to access their own stats or is an admin
    if (req.params.id !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access these statistics'
      });
    }
    
    const userId = req.params.id;
    
    // Get total tests taken
    const totalTests = await Result.countDocuments({ user: userId });
    
    // Get average score
    const averageScoreResult = await Result.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, averageScore: { $avg: '$score' } } }
    ]);
    
    const averageScore = averageScoreResult.length > 0 
      ? Math.round(averageScoreResult[0].averageScore) 
      : 0;
    
    // Get recent results
    const recentResults = await Result.find({ user: userId })
      .populate('test', 'title')
      .sort({ completedAt: -1 })
      .limit(5)
      .select('score test completedAt percentile');
    
    // Get best score
    const bestScore = await Result.findOne({ user: userId })
      .sort({ score: -1 })
      .select('score test completedAt')
      .populate('test', 'title');
    
    res.status(200).json({
      success: true,
      data: {
        totalTests,
        averageScore,
        recentResults,
        bestScore
      }
    });
  } catch (error) {
    next(error);
  }
};
