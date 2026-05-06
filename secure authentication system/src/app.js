import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { authenticateToken } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'secure-authentication-system' });
});

app.use('/api/auth', authRoutes);

app.get('/api/private', authenticateToken, (req, res) => {
  res.json({
    message: 'You reached a protected route.',
    user: req.user,
  });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;