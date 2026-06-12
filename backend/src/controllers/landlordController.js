const Landlord = require("../models/Landlord");

const createLandlord = async (req, res) => {
  try {
    console.log("BODY RECEIVED:");
    console.dir(req.body, { depth: null });

    const landlord = await Landlord.create({
      ...req.body,
    });

    res.status(201).json({
      success: true,
      message: "Landlord lead created successfully",
      data: landlord,
    });
  } catch (error) {
    console.log("========== LANDLORD ERROR ==========");
    console.dir(error, { depth: null });

    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

const updateLandlordPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { packageSelected } = req.body;

    const landlord = await Landlord.findByIdAndUpdate(
      id,
      {
        packageSelected,
      },
      {
        new: true,
      }
    );

    if (!landlord) {
      return res.status(404).json({
        success: false,
        message: "Landlord not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Package updated successfully",
      data: landlord,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createLandlord,
  updateLandlordPackage,
};