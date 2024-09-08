import { log } from "node:console";
import fs from "node:fs/promises";
import path from "node:path";

const booksPath = path.resolve("db.json");

export const getAllBooks = async () => {
  const books = await fs.readFile(booksPath, "utf-8");
  return JSON.parse(books);
};

export const getOneBook = async (isbn) => {
  const books = await getAllBooks();
  const book = books.find((book) => String(book.isbn) === String(isbn));
  if (!book) {
    return null;
  }
  return book;
};

export const addBook = async (book) => {
  const books = await getAllBooks();
  books.push(book);
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return book;
};

export const updateBook = async (isbn, updatedBook) => {
  const books = await getAllBooks();
  const existingBookIndex = books.findIndex((book) => {
    return String(book.isbn) === String(isbn);
  });

  if (!books[existingBookIndex]) {
    throw new Error("Book with this ISBN not found");
  }

  books[existingBookIndex] = { ...books[existingBookIndex], ...updatedBook };
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

  return books[existingBookIndex];
};

export const deleteBook = async (isbn) => {
  const books = await getAllBooks();
  const existingBookIndex = books.findIndex((book) => {
    return String(book.isbn) === String(isbn);
  });
  if (!books[existingBookIndex]) {
    throw new Error("Book with this ISBN not found");
  }
  books.splice(existingBookIndex, 1);
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

  return books[existingBookIndex];
};

export const searchBooks = async (query) => {
  const books = await getAllBooks();
  const result =
    books.filter(
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

export const markAsBorrowed = async (isbn, isBorrowed) => {
  const books = await getAllBooks();

  const existingBookIndex = books.findIndex((book) => book.isbn === isbn);
  if (existingBookIndex === -1) {
    throw new Error("Book with this ISBN not found");
  }
  books[existingBookIndex].isBorrowed = !books[existingBookIndex].isBorrowed;

  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return books[existingBookIndex];
};
