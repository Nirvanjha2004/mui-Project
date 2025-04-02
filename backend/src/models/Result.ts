import mongoose from 'mongoose';

interface IAnswer {
  questionId: mongoose.Types.ObjectId;
  answer: string | string[]; // Could be a single answer or array of answers for MCQ
  isCorrect: boolean;
}

export interface IResult extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  test: mongoose.Types.ObjectId;
  score: number;
  totalQuestions: number;
  completedAt: Date;
  timeTaken: number; // in seconds
  answers: IAnswer[];
  percentile?: number; // Calculated field
}

const ResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  },
  timeTaken: {
    type: Number,
    required: true
  },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      answer: {
        type: mongoose.Schema.Types.Mixed,
        required: true
      },
      isCorrect: {
        type: Boolean,
        required: true
      }
    }
  ],
  percentile: {
    type: Number
  }
});

// Create index for faster leaderboard calculations
ResultSchema.index({ test: 1, score: -1 });
ResultSchema.index({ user: 1, completedAt: -1 });

export default mongoose.model<IResult>('Result', ResultSchema);
