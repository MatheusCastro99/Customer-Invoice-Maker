const express = require("express");
const { calculateTax, defineTaxRate } = require("../controllers/taxController");

const taxRouter = express.Router();

taxRouter.put("/getTaxRate", defineTaxRate);
taxRouter.put("/getTaxAmount", calculateTax);

module.exports = taxRouter;
