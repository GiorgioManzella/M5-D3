// import pdfPrinter from "pdfmake";

// const getPdfReadableStream = (data) => {
//   const fonts = {
//     Helvetica: {
//       normal: "Helvetica",
//       bold: "Helvetica-Bold",
//     },
//   };

//   const docDefinition = {
//     content: ["first paragraph", data],
//     styles: {
//       header: {
//         fontSize: 18,
//         bold: true,
//       },
//       subheader: {
//         fontSize: 15,
//         bold: true,
//       },
//       small: {
//         fontSize: 8,
//       },
//     },
//     defaultStyle: {
//       font: "Helvetica",
//     },
//   };

//   const printer = new pdfPrinter(fonts);

//   const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {});

//   pdfReadableStream.end();

//   return pdfReadableStream;
// };
