const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter customer name"],
    },

    age: {
      type: Number,
      required: true,
    },

    occupation: {
      type: String,
      required: false,
    },

    profileIMG: {
      type: String,
      required: false,
    },
  },
  {
    //https://www.youtube.com/watch?v=9OfL9H6AmhQ&t=0s 24 min
  }
);
