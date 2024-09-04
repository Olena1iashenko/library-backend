// import upload from "../middlewares/upload.js";

const booksRouter = express.Router();

booksRouter.get("/", booksControllers.getAllBookes);

booksRouter.get("/:isbn", booksControllers.getOneBook);

// booksRouter.delete("/:isbn", booksControllers.deleteContact);

// booksRouter.post(
//   "/",
//   upload.single("book"),
//   isEmptyBody,
//   validateBody(createContactSchema),
//   booksControllers.createContact
// );

// booksRouter.put(
//   "/:isbn",
//   isEmptyBody,
//   validateBody(updateContactSchema),
//   booksControllers.updateContact
// );

// booksRouter.patch(
//   "/:isbn/favorite",
//   isEmptyBody,
//   validateBody(updateContactSchema),
//   booksControllers.updateStatusContact
// );

export default booksRouter;
