require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const customerRoute = require("./routes/customerRoute");
const errorMiddleware = require("./middlewares/errorMiddleware");

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

const app = express();

//Middlewares

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Route path, this is all server functionalities
app.use("/api/customer", customerRoute);

app.get("/", (req, res) => {
  res.send("NODE API");
});

app.get("/welcome", (req, res) => {
  res.send("Welcome to my node training");
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Node API running on port", PORT);
    });
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(errorMiddleware);

//https://www.youtube.com/watch?v=v_pcW65DGu8 @ 3320
