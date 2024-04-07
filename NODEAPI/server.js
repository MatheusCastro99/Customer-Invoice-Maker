require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const customerRoute = require("./routes/customerRoute");
const taxRoute = require("./routes/taxRoute");
const pdfRoute = require("./routes/pdfRoute");
const errorMiddleware = require("./middlewares/errorMiddleware");
const cors = require("cors");

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const FRONTEND = process.env.FRONTEND;

const app = express();
const corsAddress = {
  origin: FRONTEND, //can be used in array[] form to allow multiple origins
  successStatus: 200, //204 for some legacy browsers
};
//Middlewares

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors(corsAddress));

//Route path, this is all server functionalities
app.use("/api/customer", customerRoute);
app.use("/api/taxinfo", taxRoute);
app.use("/api/taxinfo/getTaxRate", taxRoute);
app.use("/api/taxinfo/getTaxAmount", taxRoute);
app.use("/api/generatePdf", pdfRoute);

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
