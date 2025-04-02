import mongoose from 'mongoose';

export interface IOption {
  _id?: mongoose.Types.ObjectId;
  text: string;
  isCorrect?: boolean;
}

export interface IQuestion {
  _id?: mongoose.Types.ObjectId;
  type: 'mcq' | 'scq' | 'blank';
  question: string;
  options?: IOption[];
  answer?: string; // For fill-in-the-blank questions
}

export interface ITest extends mongoose.Document {
  title: string;
  description: string;
  timeLimit: number; // in minutes
  questions: IQuestion[];
  creator: mongoose.Types.ObjectId;
  createdAt: Date;
  isActive: boolean;
}

// Define types for document context in validators
interface QuestionDocument {
  type: 'mcq' | 'scq' | 'blank';
}

const TestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a test title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a test description'],
    trim: true
  },
  timeLimit: {
    type: Number,
    required: [true, 'Please specify a time limit'],
    min: [1, 'Time limit must be at least 1 minute']
  },
  questions: [
    {
      type: {
        type: String,
        required: true,
        enum: ['mcq', 'scq', 'blank']
      },
      question: {
        type: String,
        required: true
      },
      options: [
        {
          text: {
            type: String,
            required: function(this: QuestionDocument) { 
              return this.type === 'mcq' || this.type === 'scq'; 
            }
          },
          isCorrect: {
            type: Boolean,
            default: false
          }
        }
      ],
      answer: {
        type: String,
        required: function(this: QuestionDocument) { 
          return this.type === 'blank'; 
        }
      }
    }
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model<ITest>('Test', TestSchema);
