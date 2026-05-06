const books = [
  {
    id: 'b1',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    year: 2008,
    genre: 'Programming',
  },
  {
    id: 'b2',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    year: 1999,
    genre: 'Programming',
  },
];

export function getBooks() {
  return books;
}

export function findBookById(id) {
  return books.find((book) => book.id === id) || null;
}

export function addBook(book) {
  books.push(book);
  return book;
}

export function updateBook(id, updates) {
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) {
    return null;
  }

  books[index] = {
    ...books[index],
    ...updates,
  };

  return books[index];
}

export function removeBook(id) {
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) {
    return false;
  }

  books.splice(index, 1);
  return true;
}