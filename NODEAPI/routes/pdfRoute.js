const express = require("express");
const { retrievePdfInfo } = require("../controllers/pdfController");

const pdfRouter = express.Router();

pdfRouter.put("/", retrievePdfInfo);

module.exports = pdfRouter;
