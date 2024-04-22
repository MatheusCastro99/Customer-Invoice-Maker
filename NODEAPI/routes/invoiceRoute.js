const express = require("express");
const {
  getInvoice,
  delInvoice,
  postInvoice,
} = require("../controllers/invoiceController");

const invoiceRouter = express.Router();

invoiceRouter.get("/", getInvoice);

invoiceRouter.delete("/:id", delInvoice);

invoiceRouter.post("/", postInvoice);

module.exports = invoiceRouter;
