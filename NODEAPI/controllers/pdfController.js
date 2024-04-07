const asyncHandler = require("express-async-handler");

const retrievePdfInfo = asyncHandler((req, res) => {
  console.log(req.body);
  res.status(200).json();
});

module.exports = { retrievePdfInfo };
