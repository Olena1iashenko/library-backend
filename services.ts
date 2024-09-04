import db from "./db.js";

interface Book {
  isbn: string;
  title: string;
  author: string;
  isBorrowed: boolean;
}
interface BookService {
  getAllBooks(): Book[];
  addBook(book: Book): void;
  updateBook(isbn: string, updatedBook: Partial<Book>): void;
  deleteBook(isbn: string): void;
  searchBooks(query: string): Book[];
  markAsBorrowed(isbn: string, isBorrowed: boolean): void;
}

export const getAllBooks = (): Book[] => {
  return db || [];
};

export const getOneBook = (isbn: Book["isbn"]): Book | null => {
  const book = db.find((book: Book) => book.isbn === isbn);
  return book || null;
};

export const addBook = (book: Book): void => {
  if (getOneBook(book.isbn)) {
    throw new Error("Book with this ISBN already exists");
  }
  db.push(book);
};

export const updateBook = (
  isbn: Book["isbn"],
  updatedBook: Partial<Book>
): void => {
  const existingBookIndex = db.findIndex((book: Book) => book.isbn === isbn);
  if (existingBookIndex === -1) {
    throw new Error("Book with this ISBN not found");
  }
  db[existingBookIndex] = { ...db[existingBookIndex], ...updatedBook };
};

export const deleteBook = (isbn: string): void => {
  const existingBookIndex = db.findIndex((book: Book) => book.isbn === isbn);
  if (existingBookIndex === -1) {
    throw new Error("Book with this ISBN not found");
  }
  db.splice(existingBookIndex, 1);
};

export const searchBooks = (query: string): Book[] => {
  const result =
    db.filter(
      (book: Book) =>
        book.isbn.trim().includes(query.trim()) ||
        book.title.toLowerCase().trim().includes(query.toLowerCase().trim())
      // || book.author.toLowerCase().trim().includes(query.toLowerCase().trim())
    ) || [];
  if (result.length === 0) {
    throw new Error("No books found. Try another search");
  }
  return result;
};

export const markAsBorrowed = (isbn: string, isBorrowed: boolean): void => {
  const existingBookIndex = db.findIndex((book: Book) => book.isbn === isbn);
  if (existingBookIndex === -1) {
    throw new Error("Book with this ISBN not found");
  }
  db[existingBookIndex].isBorrowed = isBorrowed;
};
