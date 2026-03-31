import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Accept both MONGO_URI and MONGO_URL (common naming mismatch in env files)
// Keep fallback for local dev, but log notice when used.
const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_URL;

if (!MONGO_URI) {
  console.error(
    'MongoDB connection string not found in MONGO_URI or MONGO_URL environment variables.',
  );
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.log('Please check your MONGO_URI in .env file');
    // process.exit(1); // Remove exit to prevent crash
  }
};

export default connectDB;
