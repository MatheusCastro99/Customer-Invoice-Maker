const CustomerModel = require("../models/customerModel");
const asyncHandler = require("express-async-handler");

//All the actual logic goes in a Controller, and the is exported to other areas

//Read (GET) logic
const getCustomers = asyncHandler(async (req, res) => {
  try {
    const customer = await CustomerModel.find({});
    res.status(200).json(customer);
  } catch (error) {
    res.status(500);
    throw new Error("Something broke, please shed a tear for your dev friend");
  }
});

const getCustomerByID = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await CustomerModel.findById(id);
    res.status(200).json(customer);
  } catch (error) {
    //Regular errorMiddleware will not work inside async functions, use async express route error handler
    res.status(500);
    throw new Error("Customer not found");
  }
});

//Create (POST) logic
const postCustomer = asyncHandler(async (req, res) => {
  try {
    var customer = await CustomerModel.create(req.body);
    res.status(200);
    res.json(customer);
  } catch (error) {
    res.status(500);
    throw new Error("Could not create new customer at this time");
  }
});

//UPDATE logic
const updateCustomer = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await CustomerModel.findByIdAndUpdate(id, req.body);
    if (!customer) {
      res.status(404);
      throw new Error("Customer not found");
    }
    const customerUpdated = await CustomerModel.findById(id);
    console.log("Customer update. New values:", customerUpdated);
    res.status(200).json(customerUpdated);
  } catch (error) {
    res.status(500);
    throw new Error("Could not update customer at this time");
  }
});

//DELETE logic
const delCustomer = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await CustomerModel.findByIdAndDelete(id);
    if (!customer) {
      res.status(404);
      throw new Error("Customer not found");
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500);
    throw new Error("Could not delete customer at this time");
  }
});

module.exports = {
  getCustomers,
  getCustomerByID,
  postCustomer,
  updateCustomer,
  delCustomer,
};
