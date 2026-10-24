import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/interviewos';
  try {
    const conn = await mongoose.connect(uri);
    console.log(`[InterviewOS MongoDB] Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[InterviewOS MongoDB Error]: ${error.message}`);
    process.exit(1);
  }
}
