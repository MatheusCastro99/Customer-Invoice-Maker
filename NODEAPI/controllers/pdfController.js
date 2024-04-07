const asyncHandler = require("express-async-handler");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const retrievePdfInfo = asyncHandler((req, res) => {
  const companyInfo = req.body.tempCustomer;
  const jobInfo = [
    //SEPARATE INDIVIDUALLY
    req.body.jobDescription,
    req.body.jobPrice,
    req.body.correspondingTax,
    req.body.finalPrice,
  ];

  const doc = new PDFDocument();

  doc.text(companyInfo.companyName);
  doc.end();

  doc.pipe(fs.createWriteStream("output.pdf"));
  doc.pipe(res);

  console.log(companyInfo);
  console.log(jobInfo);

  //res.status(200).json(res);
});

module.exports = { retrievePdfInfo };
