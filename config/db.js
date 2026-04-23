import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get MongoDB connection string from environment variables
const MONGO_URI = process.env.MONGO_URI;

// Validate that MONGO_URI is set
if (!MONGO_URI) {
  console.error(
    '❌ MongoDB connection string not found in MONGO_URI environment variable.'
  );
  console.error('Please check your .env file and ensure MONGO_URI is properly set.');
  process.exit(1);
}

/**
 * Connect to MongoDB
 * This function establishes a connection to MongoDB using Mongoose
 */
const connectDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    
    // Connection options for better performance and stability
    const connection = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
