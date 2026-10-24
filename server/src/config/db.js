import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined.');
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
    };

    console.log(`[InterviewOS MongoDB] Initiating connection to: ${uri.replace(/:([^@]+)@/, ':****@')}`);
    cached.promise = mongoose.connect(uri, opts).then((m) => {
      console.log(`[InterviewOS MongoDB] Successfully connected to ${m.connection.host}/${m.connection.name}`);
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error(`[InterviewOS MongoDB Connection Failed]:`, e.message);
    throw e;
  }

  return cached.conn;
}
