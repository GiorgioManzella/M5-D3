import express from "express";

const pdfRoute = express.Router();

pdfRoute.get("/DownloadPdf", (req, res, next) => {
  try {
    res.setHeader(
      'Content-Disposition", "attachment; filename=whatever.json.gz'
    );

    const source = getPdfReadableStream("hello");
    const transform = createGzip();
    const destination = res;

    pipeline(source, transform, destination, (err) => {
      if (err) console.log(err);
    });
  } catch (error) {}
});

export default pdfRoute;
