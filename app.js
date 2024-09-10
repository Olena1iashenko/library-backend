import express from "express";
import booksRouter from "./booksRouter.js";
import cors from "cors";
// const cors = require("cors");

console.log("Start");
const startServer = () => {
  console.log("Next");
  const corsOptions = {
    origin: "*",
  };

  const app = express();
  const port = 3000;
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // app.use(cors());
  app.use(cors(corsOptions));

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/books", booksRouter);

  app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  app.use((error, req, res, next) => {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

export default startServer;
