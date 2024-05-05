const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "please enter the company name"],
    },

    phoneNumber: {
      type: Number,
      required: [true, "please enter the phone number"],
    },

    companyEmail: {
      type: String,
      required: false,
    },

    contactName: {
      type: String,
      required: [true, "please enter the contact name"],
    },

    image: {
      type: String,
      required: false,
    },

    streetAddress: {
      type: String,
      required: false,
    },

    cityAddress: {
      type: String,
      required: false,
    },

    stateAddress: {
      type: String,
      required: false,
    },

    zipAddress: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const CustomerModel = mongoose.model("Customer", customerSchema);

module.exports = CustomerModel;
