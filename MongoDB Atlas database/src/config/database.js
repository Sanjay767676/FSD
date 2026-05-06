import mongoose from 'mongoose';

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('MONGODB_URI is not set. Using in-memory demo store.');
    return { connected: false };
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });

    console.log('Connected to MongoDB Atlas through Mongoose.');
    return { connected: true };
  } catch (error) {
    console.warn(`MongoDB connection failed. Using in-memory demo store instead. ${error.message}`);
    return { connected: false };
  }
}

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}