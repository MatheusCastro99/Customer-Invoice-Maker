const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.get("/", (req, res) => {
  res.send("NODE API");
  req;
});
app.get("/welcome", (req, res) => {
  res.send("Welcome to my node training");
  req;
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
