import { randomUUID } from 'node:crypto';
import mongoose from 'mongoose';
import Book from '../models/Book.js';
import {
  addBookToStore,
  deleteBookFromStore,
  getBookFromStore,
  getBooksFromStore,
  updateBookInStore,
} from '../data/bookStore.js';
import { isDatabaseConnected } from '../config/database.js';

function useDatabase() {
  return isDatabaseConnected();
}

export async function getBooks(req, res) {
  if (useDatabase()) {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json({ source: 'mongodb', count: books.length, books });
  }

  const books = getBooksFromStore();
  return res.json({ source: 'memory', count: books.length, books });
}

export async function getBookById(req, res) {
  const { id } = req.params;

  if (useDatabase()) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book id.' });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    return res.json({ source: 'mongodb', book });
  }

  const book = getBookFromStore(id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found.' });
  }

  return res.json({ source: 'memory', book });
}

export async function createBook(req, res) {
  const { title, author, genre, year } = req.body;

  if (!title || !author || year === undefined) {
    return res.status(400).json({ message: 'Title, author, and year are required.' });
  }

  const normalizedBook = {
    title: String(title).trim(),
    author: String(author).trim(),
    genre: genre ? String(genre).trim() : 'General',
    year: Number(year),
  };

  if (Number.isNaN(normalizedBook.year)) {
    return res.status(400).json({ message: 'Year must be a valid number.' });
  }

  if (useDatabase()) {
    const created = await Book.create(normalizedBook);
    return res.status(201).json({ source: 'mongodb', message: 'Book created successfully.', book: created });
  }

  const created = addBookToStore({ id: randomUUID(), ...normalizedBook });
  return res.status(201).json({ source: 'memory', message: 'Book created successfully.', book: created });
}

export async function updateBook(req, res) {
  const { id } = req.params;
  const updates = {};

  if (req.body.title !== undefined) updates.title = String(req.body.title).trim();
  if (req.body.author !== undefined) updates.author = String(req.body.author).trim();
  if (req.body.genre !== undefined) updates.genre = String(req.body.genre).trim();
  if (req.body.year !== undefined) updates.year = Number(req.body.year);

  if (updates.year !== undefined && Number.isNaN(updates.year)) {
    return res.status(400).json({ message: 'Year must be a valid number.' });
  }

  if (useDatabase()) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book id.' });
    }

    const updated = await Book.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!updated) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    return res.json({ source: 'mongodb', message: 'Book updated successfully.', book: updated });
  }

  const updated = updateBookInStore(id, updates);
  if (!updated) {
    return res.status(404).json({ message: 'Book not found.' });
  }

  return res.json({ source: 'memory', message: 'Book updated successfully.', book: updated });
}

export async function deleteBook(req, res) {
  const { id } = req.params;

  if (useDatabase()) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book id.' });
    }

    const deleted = await Book.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    return res.json({ source: 'mongodb', message: 'Book deleted successfully.' });
  }

  const removed = deleteBookFromStore(id);
  if (!removed) {
    return res.status(404).json({ message: 'Book not found.' });
  }

  return res.json({ source: 'memory', message: 'Book deleted successfully.' });
}