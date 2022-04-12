import pdfPrinter from "pdfmake";

let fonts = {
  Roboto: {
    normal: "fonts/Roboto-Regular.ttf",
    bold: "fonts/Roboto-Medium.ttf",
  },
};

const docDefinition = {
  content: ["first paragraph", "another paragraph but htis time longer"],
};

const printer = new pdfPrinter(fonts);

const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {});

pdfReadableStream.end();
