
import mongoose from 'mongoose';
import { ProblemModel } from './models/problem.js'; // Adjust path as necessary
import dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

const defaultProblems = [
  {
    name: 'Problem 1',
    statement: 'Solve this problem.',
    sampleInput: 'Sample input 1',
    sampleOutput: 'Sample output 1',
    difficulty: 'Easy',
    testCases: [
      { input: 'Test input 1', output: 'Test output 1' },
      { input: 'Test input 2', output: 'Test output 2' },
    ],
    public: true,
  },
  {
    name: 'Problem 2',
    statement: 'Solve this another problem.',
    sampleInput: 'Sample input 2',
    sampleOutput: 'Sample output 2',
    difficulty: 'Medium',
    testCases: [
      { input: 'Test input 3', output: 'Test output 3' },
      { input: 'Test input 4', output: 'Test output 4' },
    ],
    public: true,
  },
];

const addDefaultProblems = async () => {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    await ProblemModel.insertMany(defaultProblems);
    console.log('Default problems added successfully!');
  } catch (err) {
    console.error('Error adding default problems:', err);
  }finally {
    mongoose.connection.close();
  }
};

addDefaultProblems();
