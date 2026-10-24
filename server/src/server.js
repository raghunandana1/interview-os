import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import applicationRoutes from './routes/applicationRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import calendarRoutes from './routes/calendarRoutes.js';
import cheatSheetRoutes from './routes/cheatSheetRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import syncRoutes from './routes/syncRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// Health & System Info
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    system: 'InterviewOS MERN Backend',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.use('/api/applications', applicationRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/cheatsheet', cheatSheetRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/sync', syncRoutes);

// Global 404
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[InterviewOS Server Error]:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Start Server if run directly (local development)
export { app, start };

if (!process.env.VERCEL) {
  start();
}

export default app;
