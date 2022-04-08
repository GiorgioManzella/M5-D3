import express from "express";
import multer from "multer";
import { storeAuthorAvatar } from "../lib/fs-tools.js";

//POST METHOD IMAGE + ID

authorsRouter.post(
  "/:authorsId/Avatar",
  multer().single("Avatar"),
  async (req, res, next) => {
    try {
      await storeAuthorAvatar("FirstGif.gif", req.file.buffer);

      res.status(201).send({ message: "image Uploaded successfully" });
    } catch (error) {}
  }
);
