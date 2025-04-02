import { Request, Response, NextFunction } from 'express';
import Test from '../models/Test';
import Result from '../models/Result';
import mongoose from 'mongoose';
import { IOption, IQuestion } from '../models/Test';

// Create a test
export const createTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, timeLimit, questions } = req.body;
    
    const test = await Test.create({
      title,
      description,
      timeLimit,
      questions,
      creator: req.user?.id
    });
    
    res.status(201).json({
      success: true,
      data: test
    });
  } catch (error) {
    next(error);
  }
};

// Get all tests
export const getAllTests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query: any = { isActive: true };
    
    // If user is not admin, filter by creator
    if (req.user?.role !== 'admin') {
      query.creator = req.user?.id;
    }
    
    const tests = await Test.find(query)
      .select('title description timeLimit createdAt')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: tests.length,
      data: tests
    });
  } catch (error) {
    next(error);
  }
};

// Get single test by ID
export const getTestById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const test = await Test.findById(req.params.id);
    
    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test not found'
      });
    }
    
    // If user is not admin and not the creator, don't show the test
    if (req.user?.role !== 'admin' && test.creator.toString() !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this test'
      });
    }
    
    res.status(200).json({
      success: true,
      data: test
    });
  } catch (error) {
    next(error);
  }
};

// Update test
export const updateTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let test = await Test.findById(req.params.id);
    
    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test not found'
      });
    }
    
    // Check if user is authorized to update
    if (req.user?.role !== 'admin' && test.creator.toString() !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this test'
      });
    }
    
    test = await Test.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: test
    });
  } catch (error) {
    next(error);
  }
};

// Delete test
export const deleteTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const test = await Test.findById(req.params.id);
    
    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test not found'
      });
    }
    
    // Check if user is authorized to delete
    if (req.user?.role !== 'admin' && test.creator.toString() !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this test'
      });
    }
    
    // Replace test.remove() with deleteOne()
    await Test.deleteOne({ _id: test._id });
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// Submit test result
export const submitTestResult = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { testId, answers, timeTaken } = req.body;
    
    const test = await Test.findById(testId);
    
    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test not found'
      });
    }
    
    // Calculate score
    let score = 0;
    const processedAnswers = [];
    
    for (const answer of answers) {
      // Find the question in the questions array by comparing IDs
      const question = test.questions.find(q => q._id?.toString() === answer.questionId);
      
      if (!question) {
        continue;
      }
      
      let isCorrect = false;
      
      if (question.type === 'blank') {
        isCorrect = answer.answer.toLowerCase() === question.answer?.toLowerCase();
      } else {
        // For MCQ and SCQ
        const correctOptions = question.options
          ?.filter((opt: IOption) => opt.isCorrect)
          .map((opt: IOption) => opt._id?.toString()) || [];
        
        if (Array.isArray(answer.answer)) {
          isCorrect = answer.answer.length === correctOptions.length && 
                      answer.answer.every((a: string) => correctOptions.includes(a));
        } else {
          isCorrect = correctOptions.includes(answer.answer);
        }
      }
      
      if (isCorrect) {
        score++;
      }
      
      processedAnswers.push({
        questionId: answer.questionId,
        answer: answer.answer,
        isCorrect
      });
    }
    
    const totalQuestions = test.questions.length;
    const finalScore = Math.round((score / totalQuestions) * 100);
    
    // Create result
    const result = await Result.create({
      user: req.user?.id,
      test: testId,
      score: finalScore,
      totalQuestions,
      timeTaken,
      answers: processedAnswers
    });
    
    // Calculate percentile (can be optimized based on your specific needs)
    const betterResults = await Result.countDocuments({
      test: testId,
      score: { $gt: finalScore }
    });
    
    const totalResults = await Result.countDocuments({ test: testId });
    const percentile = Math.round((1 - (betterResults / totalResults)) * 100);
    
    result.percentile = percentile;
    await result.save();
    
    res.status(201).json({
      success: true,
      data: {
        score: finalScore,
        percentile,
        timeTaken
      }
    });
  } catch (error) {
    next(error);
  }
};
