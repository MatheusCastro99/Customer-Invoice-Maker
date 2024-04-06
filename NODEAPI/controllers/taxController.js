const asyncHandler = require("express-async-handler");

const defineTaxRate = asyncHandler((req, res) => {
  const state = req.body.state;
  let taxRate;
  function correspondingTax(state) {
    switch (state) {
      case "NJ":
        taxRate = 6.625;
        break;
      case "PA":
        taxRate = 6;
        break;
      case "NY":
        taxRate = 8.53;
        break;
      case "FL":
        taxRate = 6;
        break;
      case "CT":
        taxRate = 6.35;
        break;

      default:
        taxRate = "Please add tax rate manually";
        break;
    }
  }
  correspondingTax(state);
  console.log([state, taxRate]);
  res.status(200).json(taxRate);
});

const calculateTax = asyncHandler((req, res) => {
  let taxRate = req.body.taxRate;
  let jobPrice = req.body.jobPrice;
  console.log(req.body);

  if (jobPrice === "" || taxRate === "Please add tax rate manually") {
    jobPrice = 0;
    taxRate = 0;
  }

  const taxAmount = (taxRate / 100) * parseFloat(jobPrice);
  const finalPrice = parseFloat(jobPrice) + parseFloat(taxAmount.toFixed(2));
  console.log(finalPrice, taxAmount);
  res.status(200).json(finalPrice);
});

module.exports = { defineTaxRate, calculateTax };
