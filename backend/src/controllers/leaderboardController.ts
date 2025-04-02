import { Request, Response, NextFunction } from 'express';
import Result from '../models/Result';
import mongoose from 'mongoose';

// Get overall leaderboard
export const getOverallLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit = 10 } = req.query;
    
    const pipeline: mongoose.PipelineStage[] = [
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
          email: '$userDetails.email',
          averageScore: 1,
          totalTests: 1,
          bestScore: 1
        }
      }
    ];
    
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

// Get test-specific leaderboard
export const getTestLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { testId } = req.params;
    const { limit = 10 } = req.query;
    
    if (!testId) {
      return res.status(400).json({
        success: false,
        message: 'Test ID is required'
      });
    }
    
    const leaderboard = await Result.find({ test: testId })
      .sort({ score: -1 })
      .limit(parseInt(limit as string, 10))
      .populate<{ user: { _id: string; name: string; email: string } }>('user', 'name email')
      .select('score timeTaken completedAt user');
    
    // Format the response
    const formattedLeaderboard = leaderboard.map((result, index) => ({
      rank: index + 1,
      userId: result.user._id,
      name: result.user?.name,
      email: result.user?.email,
      score: result.score,
      timeTaken: result.timeTaken,
      completedAt: result.completedAt
    }));
    
    res.status(200).json({
      success: true,
      count: formattedLeaderboard.length,
      data: formattedLeaderboard
    });
  } catch (error) {
    next(error);
  }
};

// Get user ranking
export const getUserRanking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const { testId } = req.query;
    
    let query: any = {};
    
    // If testId is provided, get ranking for specific test
    if (testId) {
      query.test = testId;
      
      // Get user's best result for this test
      const userBestResult = await Result.findOne({ 
        user: userId, 
        test: testId 
      }).sort({ score: -1 });
      
      if (!userBestResult) {
        return res.status(404).json({
          success: false,
          message: 'User has not taken this test'
        });
      }
      
      // Count how many users have a higher score
      const betterResults = await Result.aggregate([
        { $match: { test: new mongoose.Types.ObjectId(testId as string) } },
        { $sort: { score: -1 as const } },
        { $group: { _id: '$user', bestScore: { $max: '$score' } } },
        { $match: { bestScore: { $gt: userBestResult.score } } },
        { $count: 'betterCount' }
      ]);
      
      // Count total unique users who took the test
      const totalUsers = await Result.distinct('user', { test: testId }).countDocuments();
      
      const rank = betterResults.length > 0 ? betterResults[0].betterCount + 1 : 1;
      
      return res.status(200).json({
        success: true,
        data: {
          userId,
          testId,
          score: userBestResult.score,
          rank,
          totalUsers,
          percentile: Math.round(((totalUsers - rank) / totalUsers) * 100)
        }
      });
    } 
    // Overall ranking based on average score
    else {
      // Get all users sorted by average score
      const userRankings = await Result.aggregate([
        {
          $group: {
            _id: '$user',
            averageScore: { $avg: '$score' },
            totalTests: { $sum: 1 }
          }
        },
        {
          $sort: { averageScore: -1 as const }
        }
      ]);
      
      // Find the user's position
      const userPosition = userRankings.findIndex(user => user._id.toString() === userId);
      
      if (userPosition === -1) {
        return res.status(404).json({
          success: false,
          message: 'User has not taken any tests'
        });
      }
      
      const userRank = userPosition + 1;
      const totalUsers = userRankings.length;
      
      return res.status(200).json({
        success: true,
        data: {
          userId,
          rank: userRank,
          totalUsers,
          averageScore: userRankings[userPosition].averageScore,
          totalTests: userRankings[userPosition].totalTests,
          percentile: Math.round(((totalUsers - userRank) / totalUsers) * 100)
        }
      });
    }
  } catch (error) {
    next(error);
  }
};
