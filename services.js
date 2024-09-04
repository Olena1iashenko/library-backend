import db from "./db.js";

export const getAllBooks = () => {
  return db || [];
};

export const getOneBook = (isbn) => {
  const book = db.find((book) => book.isbn === isbn);
  return book || null;
};

export const addBook = (book) => {
  if (getOneBook(book.isbn)) {
    throw new Error("Book with this ISBN already exists");
  }
  db.push(book);
};

export const updateBook = (isbn, updatedBook) => {
  const existingBookIndex = db.findIndex((book) => book.isbn === isbn);
  if (existingBookIndex === -1) {
    throw new Error("Book with this ISBN not found");
  }
  db[existingBookIndex] = { ...db[existingBookIndex], ...updatedBook };
};

export const deleteBook = (isbn) => {
  const existingBookIndex = db.findIndex((book) => book.isbn === isbn);
  if (existingBookIndex === -1) {
    throw new Error("Book with this ISBN not found");
  }
  db.splice(existingBookIndex, 1);
};

export const searchBooks = (query) => {
  const result =
    db.filter(
      (book) =>
        book.isbn.trim().includes(query.trim()) ||
        book.title.toLowerCase().trim().includes(query.toLowerCase().trim())
      // || book.author.toLowerCase().trim().includes(query.toLowerCase().trim())
    ) || [];
  if (result.length === 0) {
    throw new Error("No books found. Try another search");
  }
  return result;
};

export const markAsBorrowed = (isbn, isBorrowed) => {
  const existingBookIndex = db.findIndex((book) => book.isbn === isbn);
  if (existingBookIndex === -1) {
    throw new Error("Book with this ISBN not found");
  }
  db[existingBookIndex].isBorrowed = isBorrowed;
};
