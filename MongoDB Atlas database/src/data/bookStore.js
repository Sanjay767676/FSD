const bookStore = [
  {
    id: 'demo-1',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    genre: 'Programming',
    year: 2008,
  },
  {
    id: 'demo-2',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    year: 2018,
  },
];

export function getBooksFromStore() {
  return bookStore;
}

export function getBookFromStore(id) {
  return bookStore.find((book) => book.id === id) || null;
}

export function addBookToStore(book) {
  bookStore.unshift(book);
  return book;
}

export function updateBookInStore(id, updates) {
  const index = bookStore.findIndex((book) => book.id === id);

  if (index === -1) {
    return null;
  }

  bookStore[index] = {
    ...bookStore[index],
    ...updates,
  };

  return bookStore[index];
}

export function deleteBookFromStore(id) {
  const index = bookStore.findIndex((book) => book.id === id);

  if (index === -1) {
    return false;
  }

  bookStore.splice(index, 1);
  return true;
}