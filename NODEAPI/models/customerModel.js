const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter customer name"],
    },

    age: {
      type: Number,
      required: [true, "please enter customer age"],
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
    timestamps: true,
  }
);

const CustomerModel = mongoose.model("Customer", customerSchema);

module.exports = CustomerModel;
