import express from "express";
import booksControllers from "./controllers.js";
import isEmptyBody from "./helpers/isEmptyBody.js";
import {
  createBookSchema,
  updateBookSchema,
} from "./helpers/validationSchemas.js";
import validateBody from "./helpers/validateBody.js";

const booksRouter = express.Router();

booksRouter.get("/", booksControllers.getAllBooks);

booksRouter.post(
  "/",
  isEmptyBody,
  validateBody(createBookSchema),
  booksControllers.addBook
);

booksRouter.put(
  "/:isbn",
  isEmptyBody,
  validateBody(updateBookSchema),
  booksControllers.updateBook
);

booksRouter.delete("/:isbn", booksControllers.deleteBook);

booksRouter.get("/search", booksControllers.searchBooks);

booksRouter.get("/:isbn", booksControllers.getOneBook);

booksRouter.patch("/:isbn/borrow", booksControllers.markAsBorrowed);

export default booksRouter;
