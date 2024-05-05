const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Please enter Customer Name"],
    },

    dateOfService: {
      type: String,
      required: [true, "Please enter Date"],
    },

    invoiceNumber: {
      type: String,
      required: false,
    },

    finalPrice: {
      type: Number,
      required: [true, "Please enter Final Price"],
    },

    jobDescription: {
      type: String,
      required: false,
    },

    taxRate: {
      type: Number,
      required: false,
    },

    subtotal: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const InvoiceModel = mongoose.model("Invoice", invoiceSchema);

module.exports = InvoiceModel;
