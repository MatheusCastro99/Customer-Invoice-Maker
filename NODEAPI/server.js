const express = require("express");
const mongoose = require("mongoose");
const CustomerModel = require("./models/customerModel");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    type: "*/x-www-form-urlencoded ",
    extended: true,
  }) //NAO TA LENDO ESSA BUCETA DE REQUEST EM FORM DATA
);

app.get("/", (req, res) => {
  res.send("NODE API");
});

app.get("/welcome", (req, res) => {
  res.send("Welcome to my node training");
});

//READ
app.get("/customer", async (req, res) => {
  try {
    const customer = await CustomerModel.find({});
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/customer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await CustomerModel.findById(id);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//CREATE
app.post("/customer", async (req, res) => {
  try {
    const customer = await CustomerModel.create(req.body);
    res.status(200);
    res.json(customer);
  } catch (error) {
    console.log(error.message);
    console.log(req.body);
    res.status(500).json({ message: error.message });
  }
});

//UPDATE
app.put("/customer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await CustomerModel.findByIdAndUpdate(id, req.body);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    const customerUpdated = await CustomerModel.findById(id);
    res.status(200).json(customerUpdated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://admin:admin@nodeapi.vxkfmqp.mongodb.net/API-test?retryWrites=true&w=majority&appName=NodeAPI"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Node API running on port 3000");
    });
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
