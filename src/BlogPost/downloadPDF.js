import pdfPrinter from "pdfmake";

export const getPdfReadableStream = (data) => {
  const fonts = {
    Roboto: {
      normal: "fonts/Roboto-Regular.ttf",
      bold: "fonts/Roboto-Medium.ttf",
    },
  };

  const docDefinition = {
    content: ["first paragraph", data],
  };

  const printer = new pdfPrinter(fonts);

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {});

  pdfReadableStream.end();

  return pdfReadableStream;
};
