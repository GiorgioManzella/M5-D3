import express from "express";
import pipeline from "stream";
import { getPdfReadableStream } from "../BlogPost/downloadPDF.js";
import { createGzip } from "zlib";

const pdfRoute = express.Router();

pdfRoute.get("/DownloadPdf", (req, res, next) => {
  try {
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=whatever.json.gz"
    );

    const source = getPdfReadableStream();
    const transform = createGzip();
    const destination = res;

    pipeline(source, transform, destination, (err) => {
      if (err) console.log(err);
    });
  } catch (error) {
    next(error);
  }
});

export default pdfRoute;
