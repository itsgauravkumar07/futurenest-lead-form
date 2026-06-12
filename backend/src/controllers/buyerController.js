const Buyer = require("../models/Buyer");

const createBuyer = async (req, res) => {
  try {
    const buyer = await Buyer.create(req.body);

    res.status(201).json({
      success: true,
      message: "Buyer lead created successfully",
      data: buyer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBuyer,
};