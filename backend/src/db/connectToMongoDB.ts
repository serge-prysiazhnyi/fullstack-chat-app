import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectToMongoDB = async () => {
  try {
    mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);
    console.log('Connected to MongoDB');
  } catch (e) {
    console.log(`Error connecting to MongoDB: ${(e as Error).message}`);
  }
};
