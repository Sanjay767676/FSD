import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { addBook, findBookById, getBooks, removeBook, updateBook } from '../data/books.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ count: getBooks().length, books: getBooks() });
});

router.get('/get', (req, res) => {
  res.json({ count: getBooks().length, books: getBooks() });
});

router.get('/get/:id', (req, res) => {
  const book = findBookById(req.params.id);

  if (!book) {
    return res.status(404).json({ message: 'Book not found.' });
  }

  return res.json(book);
});

router.get('/:id', (req, res) => {
  const book = findBookById(req.params.id);

  if (!book) {
    return res.status(404).json({ message: 'Book not found.' });
  }

  return res.json(book);
});

router.post('/', (req, res) => {
  const { title, author, year, genre } = req.body;

  if (!title || !author || !year) {
    return res.status(400).json({ message: 'Title, author, and year are required.' });
  }

  const newBook = {
    id: randomUUID(),
    title: String(title).trim(),
    author: String(author).trim(),
    year: Number(year),
    genre: genre ? String(genre).trim() : 'General',
  };

  if (Number.isNaN(newBook.year)) {
    return res.status(400).json({ message: 'Year must be a valid number.' });
  }

  addBook(newBook);

  return res.status(201).json({ message: 'Book created successfully.', book: newBook });
});

router.put('/:id', (req, res) => {
  const updates = {};

  if (req.body.title !== undefined) updates.title = String(req.body.title).trim();
  if (req.body.author !== undefined) updates.author = String(req.body.author).trim();
  if (req.body.year !== undefined) updates.year = Number(req.body.year);
  if (req.body.genre !== undefined) updates.genre = String(req.body.genre).trim();

  if (updates.year !== undefined && Number.isNaN(updates.year)) {
    return res.status(400).json({ message: 'Year must be a valid number.' });
  }

  const updatedBook = updateBook(req.params.id, updates);

  if (!updatedBook) {
    return res.status(404).json({ message: 'Book not found.' });
  }

  return res.json({ message: 'Book updated successfully.', book: updatedBook });
});

router.delete('/:id', (req, res) => {
  const deleted = removeBook(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: 'Book not found.' });
  }

  return res.json({ message: 'Book deleted successfully.' });
});

export default router;