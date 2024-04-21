const asyncHandler = require("express-async-handler");
const InvoiceModel = require("../models/invoiceModel");

const invoiceNumber = 500;

const retrieveInvoiceInfo = asyncHandler((req, res) => {
  const companyInfo = req.body.tempCustomer;
  const jobInfo = [
    //SEPARATE INDIVIDUALLY
    req.body.jobDescription,
    req.body.jobPrice,
    req.body.correspondingTax,
    req.body.finalPrice,
  ];
  invoiceNumber += 0.25;

  console.log(invoiceNumber);

  res.status(200).json(invoiceNumber);
});

const postInvoice = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    var invoice = await InvoiceModel.create(req.body);
    res.status(200);
    res.json(invoice);
  } catch (error) {
    res.status(500);
    throw new Error("Could not generate invoice at this time");
  }
});

const delInvoice = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await InvoiceModel.findByIdAndDelete(id);
    if (!invoice) {
      res.status(404);
      throw new Error("Invoice not found");
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500);
    throw new Error("Could not delete Invoice at this time");
  }
});

module.exports = { retrieveInvoiceInfo, postInvoice, delInvoice };
