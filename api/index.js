import { app } from '../server/src/server.js';
import { connectDB } from '../server/src/config/db.js';

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      console.error('[Vercel Serverless DB Connection Error]:', err);
      return res.status(500).json({ error: 'Database connection failed', details: err.message });
    }
  }
  return app(req, res);
}
