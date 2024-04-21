const express = require("express");
const {
  retrieveInvoiceInfo,
  delInvoice,
  postInvoice,
} = require("../controllers/invoiceController");

const invoiceRouter = express.Router();

invoiceRouter.get("/", retrieveInvoiceInfo);

invoiceRouter.delete("/:id", delInvoice);

invoiceRouter.post("/", postInvoice);

module.exports = invoiceRouter;
