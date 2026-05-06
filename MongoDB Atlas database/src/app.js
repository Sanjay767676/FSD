import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'mongodb-atlas-express-api' });
});

app.use('/api/book', bookRoutes);
app.use('/api/books', bookRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;