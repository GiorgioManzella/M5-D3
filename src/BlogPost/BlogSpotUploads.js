import express from "express";
import multer from "multer";
import { storeBlogSpotCover } from "../lib/fs-tools.js";

//POST METHOD Cover + ID

BlogSpotsRouter.post(
  "/:BlogSpotsId/Cover",
  multer().single("Cover"),
  async (req, res, next) => {
    try {
      await storeBlogSpotCover("Cover.jpg", req.file.buffer);

      res.status(201).send({ message: "image Uploaded successfully" });
    } catch (error) {}
  }
);
