import express from 'express';
import cors from 'cors';
import booksRoutes from './routes/booksRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'books-api' });
});

app.use('/api/books', booksRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;