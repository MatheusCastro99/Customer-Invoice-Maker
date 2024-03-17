const express = require("express");
const mongoose = require("mongoose");
const CustomerModel = require("./models/customerModel");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("NODE API");
});
app.get("/welcome", (req, res) => {
  res.send("Welcome to my node training");
});

app.post("/customer", async (req, res) => {
  try {
    const customer = await CustomerModel.create(req.body);
    res.status(200).json(customer);
    res.send(req.body);
  } catch (error) {
    console.log(error.message);
    console.log(req.body); //ERROR Body is coming back empty

    /*
      {
	      "name": "John Doe",
  	    "age": 24,
  	    "occupation": "Soldier"
      } attempted request body
    */

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
