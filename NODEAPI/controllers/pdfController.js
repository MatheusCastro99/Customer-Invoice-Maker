const asyncHandler = require("express-async-handler");

const retrievePdfInfo = asyncHandler((req, res) => {
  const companyInfo = req.body.tempCustomer;
  const jobInfo = [
    //SEPARATE INDIVIDUALLY
    req.body.jobDescription,
    req.body.jobPrice,
    req.body.correspondingTax,
    req.body.finalPrice,
  ];

  console.log(companyInfo);
  console.log(jobInfo);

  res.status(200).json();
});

module.exports = { retrievePdfInfo };
