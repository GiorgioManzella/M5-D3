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
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      subheader: {
        fontSize: 15,
        bold: true,
      },
      small: {
        fontSize: 8,
      },
    },
    defaultStyle: {
      font: "Helvetica",
    },
  };

  const printer = new pdfPrinter(fonts);

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {});

  pdfReadableStream.end();

  return pdfReadableStream;
};
