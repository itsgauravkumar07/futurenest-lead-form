// src/models/Tenant.js

const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema(
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

    requirementType: {
      type: String,
      required: true,
    },

    preferredLocation: String,

    monthlyBudget: String,

    moveInDate: String,

    additionalRequirements: String,

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

module.exports = mongoose.model("Tenant", tenantSchema);