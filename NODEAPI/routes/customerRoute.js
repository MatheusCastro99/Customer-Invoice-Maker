const express = require("express");
const {
  getCustomers,
  getCustomerByID,
  postCustomer,
  updateCustomer,
  delCustomer,
} = require("../controllers/customerController");

const router = express.Router();

//This file contains server functionalities

//CREATE
router.post("/", postCustomer);

//READ
router.get("/", getCustomers);

router.get("/:id", getCustomerByID);

//UPDATE
router.put("/:id", updateCustomer);

//DELETE
router.delete("/:id", delCustomer);

module.exports = router;
