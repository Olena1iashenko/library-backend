// import booksControllers from "./controllers.js";
import db from "./db.js";
console.log("Start");
const startServer = () => {
  console.log("Next");

  // const express = require("express");
  const app = express();
  const port = 3000;

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  // app.get("/books", booksControllers.getAllBookes);

  app.use("/books", booksRouter);

  // app.use((req, res) => {
  //   res.status(404).json({ message: `Route ${req.url} not found` });
  // });

  // app.use((error, req, res, next) => {
  //   const { status = 500, message = "Server error" } = error;
  //   res.status(status).json({ message });
  // });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

export default startServer;
