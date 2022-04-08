import express from "express";
import uniqid from "uniqid";
import { getAuthors, writeAuthors } from "../lib/fs-tools.js";
import multer from "multer";

const authorsRouter = express.Router();

//const currentFilePath = fileURLToPath(import.meta.url);
//const parentFolder = dirname(currentFilePath);
//const authorsJsonPath = join(parentFolder, "../Data/authors.json");

//POST METHOD
authorsRouter.post("/", async (req, res, next) => {
  try {
    const newAuthor = {
      ...req.body,
      createAt: new Date(),
      id: uniqid(),
    };

    const authorsArray = await getAuthors();
    await authorsArray.push(newAuthor);
    writeAuthors(authorsArray);

    res.status(201).send("Author successfully created");
  } catch (error) {
    next(error);
  }
});

//gET METHOD

authorsRouter.get("/", async (req, res, next) => {
  try {
    const authorsArray = await getAuthors();

    res.send(authorsArray);
  } catch (error) {
    next(error);
  }
});

// GET METHOD  + ID
authorsRouter.get("/:authorId", async (req, res, next) => {
  try {
    const authorId = req.params.authorsId;

    const authorsArray = await getAuthors();

    const currentAuthor = authorsArray.find((author) => author.id === authorId);

    res.send(currentAuthor);
  } catch (error) {
    next(error);
  }
});

// PUT METHOD + ID
authorsRouter.put("/:authorId", async (req, res, next) => {
  try {
    const authorsArray = await getAuthors();
    const currentAuthor = authorsArray.findIndex(
      (author) => author.id === req.params.authorId
    );
    const oldAuthor = authorsArray[currentAuthor];
    const updatedAuthor = { ...oldAuthor, ...req.body, updatedAt: new Date() };

    res.send(updatedAuthor);
  } catch (error) {
    next(error);
  }
});

// DELETE METHOD

authorsRouter.delete("/:authorId", async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const authorsArray = getAuthors();
    const remainingAuthors = authorsArray.filter(
      (author) => author.id !== authorId
    );

    res.send(remainingAuthors);
  } catch (error) {
    next(error);
  }
});

export default authorsRouter;
