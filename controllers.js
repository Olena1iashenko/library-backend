import * as booksService from "./services.js";
import controllerWrapper from "./helpers/controllerWrapper.js";

const getAllBooks = (req, res, next) => {
  const books = booksService.getAllBooks();
  res.status(200).json({ message: "Books get succesfully", books });
};

const getOneBook = async (req, res, next) => {
  const { isbn } = req.params;
  const book = await booksService.getOneBook(isbn);
  if (!book) {
    const error = new Error(`Book with ISBN=${isbn} not found`);
    error.status = 404;
    return next(error);
  }
  res
    .status(200)
    .json({ message: `Book with ISBN=${isbn} get succesfully`, book });
};

const addBook = async (req, res, next) => {
  const { isbn } = req.body;
  const existingBook = await booksService.getOneBook(isbn);
  if (existingBook) {
    const error = new Error("Book with this ISBN already exists");
    error.status = 409;
    return next(error);
  }
  const newBook = await booksService.addBook(req.body);
  res.status(201).json({
    message: "Book add sucesfully",
    newBook,
  });
};

const updateBook = async (req, res, next) => {
  const { isbn } = req.params;
  const updatedBook = await booksService.updateBook(isbn, req.body);
  if (!updatedBook) {
    const error = new Error(`Book with ISBN=${isbn} not found`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json({ message: `Contact edited successfully`, updatedBook });
};

const deleteBook = async (req, res, next) => {
  const { isbn } = req.params;
  const deletedBook = await booksService.deleteBook(isbn);
  if (!deletedBook) {
    const error = new Error(`Book with ISBN=${isbn} not found`);
    error.status = 404;
    return next(error);
  }
  res
    // .status(204)
    // .send();
    .json({
      message: `Book with ISBN=${isbn} deleted successfully`,
      deletedBook,
    });
};

const searchBooks = async (req, res, next) => {
  const query = req.query.query || "";
  const result = await booksService.searchBooks(query);
  if (!result) {
    const error = new Error(`Book with querey=${query} not found`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json({ message: "Books found succesfully", result });
};

const markAsBorrowed = async (req, res, next) => {
  const { isbn } = req.params;
  const bookIsBorrowed = await booksService.markAsBorrowed(isbn, req.body);
  if (!bookIsBorrowed) {
    const error = new Error(`Book with ISBN=${isbn} not found`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json({ message: "Book marked succesfully", bookIsBorrowed });
};

export default {
  getAllBooks: controllerWrapper(getAllBooks),
  getOneBook: controllerWrapper(getOneBook),
  addBook: controllerWrapper(addBook),
  updateBook: controllerWrapper(updateBook),
  deleteBook: controllerWrapper(deleteBook),
  searchBooks: controllerWrapper(searchBooks),
  markAsBorrowed: controllerWrapper(markAsBorrowed),
};
