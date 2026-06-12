// src/models/Buyer.js

const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    whatsappNumber: String,
    email: String,

    address: String,
    city: String,
    state: String,
    pinCode: String,

    propertyType: {
      type: String,
      required: true,
    },

    budget: {
      type: String,
      required: true,
    },

    preferredLocation: String,

    purchaseTimeline: String,

    additionalRequirements: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Buyer", buyerSchema);