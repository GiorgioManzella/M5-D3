// const express = require("express") // OLD SYNTAX
import express from "express"; // <-- NEW IMPORT SYNTAX (remember to add "type": "module" to package.json to use it!)
import listEndpoints from "express-list-endpoints";
import authorsRouter from "./authors/index.js";
import cors from "cors";
import { BadAssError, genericErrorHandler } from "./errorHandler.js";
import BlogPostsRouter from "./BlogPost/index.js";
import {
  badRequestErrorHandler,
  unauthorizedErrorHandler,
  notFoundErrorHandler,
} from "./errorHandler.js";
import pdfRoute from "./DownloadPdf/index.js";

const server = express();
const port = process.env.PORT || 3001;

//middlewares
const whitelist = [
  process.env.FE_DEV_URL,
  process.env.BE_DEV_URL,
  process.env.FRONT,
];

console.log(whitelist);

server.use(cors({}));
server.use(express.json());

//endopoints
server.use("/pdf", pdfRoute);
server.use("/authors", authorsRouter);
server.use("/BlogPosts", BlogPostsRouter);

// error middlewares

server.use(badRequestErrorHandler);
server.use(BadAssError);
server.use(unauthorizedErrorHandler);
server.use(notFoundErrorHandler);
server.use(genericErrorHandler);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`server is running on ${port}`);
});

const dburl = "";
