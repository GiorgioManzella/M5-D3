import express from "express";
import { pipeline } from "stream";
import { getPdfReadableStream } from "../lib/fs-tools.js";
import { createGzip } from "zlib";
import sgMail from "@sendgrid/mail";

const pdfRoute = express.Router();

pdfRoute.get("/DownloadPdf", (req, res, next) => {
  sgMail.setApiKey(process.env.API_KEY);

  const msg = {
    to: "giorgiolink94@hotmail.it",
    from: "giorgiolink94@hotmail.it", // Use the email address or domain you verified above
    subject: "Sending with Twilio SendGrid is Fun",
    text: "Pdf has been downloaded successfully",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
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
