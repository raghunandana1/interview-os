import { app } from '../server/src/server.js';
import { connectDB } from '../server/src/config/db.js';

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.error('[Vercel Serverless DB Connection Error]:', err.message);
    return res.status(500).json({ error: 'Database connection failed', details: err.message });
  }
  return app(req, res);
}
