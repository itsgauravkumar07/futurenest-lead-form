// src/models/Landlord.js

const mongoose = require("mongoose");

const landlordSchema = new mongoose.Schema(
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

    propertyLocation: {
      type: String,
      required: true,
    },

    monthlyRent: String,

    availableFrom: String,

    additionalDetails: String,

    images: {
      type: [String],
      default: [],
    },

    video: {
      type: String,
      default: "",
    },

    packageSelected: {
      type: String,
      default: null,
    },

    paymentStatus: {
    type: String,
    default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Landlord", landlordSchema);