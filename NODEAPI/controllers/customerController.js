const CustomerModel = require("../models/customerModel");

//All the actual logic goes in a Controller, and the is exported to other areas

//Read (GET) logic
const getCustomer = async (req, res) => {
  try {
    const customer = await CustomerModel.find({});
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCustomerByID = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await CustomerModel.findById(id);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create (POST) logic
const postCustomer = async (req, res) => {
  try {
    const customer = await CustomerModel.create(req.body);
    res.status(200);
    res.json(customer);
  } catch (error) {
    console.log(error.message);
    console.log(req.body);
    res.status(500).json({ message: error.message });
  }
};

//UPDATE logic
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await CustomerModel.findByIdAndUpdate(id, req.body);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    const customerUpdated = await CustomerModel.findById(id);
    console.log("Customer update. New values", customerUpdated);
    res.status(200).json(customerUpdated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//DELETE logic
const delCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await CustomerModel.findByIdAndDelete(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCustomer,
  getCustomerByID,
  postCustomer,
  updateCustomer,
  delCustomer,
};
