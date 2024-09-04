import * as booksService from "./services.ts";
import controllerWrapper from "./helpers/controllerWrapper.js";

const getAllBooks = (req, res, next) => {
  const books = booksService.getAllBooks();
  res.status(200).json({ message: "Books get succesfully", books });
};

const getOneBook = async (req, res, next) => {
  const { isbn } = req.params;
  const book = await booksService.getOneBook(isbn);
  if (!book) {
    throw HttpError(404);
  }
  res
    .status(200)
    .json({ message: `Book with ISBN=${isbn} get succesfully`, book });
};

export default {
  getAllBookes: controllerWrapper(getAllBooks),
  getOneBook: controllerWrapper(getOneBook),
};
