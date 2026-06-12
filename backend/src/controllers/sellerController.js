const Seller = require("../models/Seller");

const createSeller = async (req, res) => {
  try {
    const seller = await Seller.create(req.body);

    res.status(201).json({
      success: true,
      message: "Seller lead created successfully",
      data: seller,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const updateSellerPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { packageSelected } = req.body;

    const seller = await Seller.findByIdAndUpdate(
      id,
      {
        packageSelected,
      },
      {
        new: true,
      }
    );

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Package updated successfully",
      data: seller,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSeller,
  updateSellerPackage,
};