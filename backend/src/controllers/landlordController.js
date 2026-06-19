const Landlord = require("../models/LandLord");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

const sendLeadEmails = require(
  "../utils/sendLeadEmail"
);

const createLandlord = async (req, res) => {
  try {
    console.log("BODY RECEIVED:");
    console.dir(req.body, { depth: null });

    const imageUrls = [];
    let videoUrl = "";

    // Upload Images
    if (req.files?.images) {
      for (const file of req.files.images) {
        const result = await uploadToCloudinary(
          file.buffer,
          "image"
        );

        imageUrls.push(result.secure_url);
      }
    }

    // Upload Video
    if (req.files?.video?.[0]) {
      const result = await uploadToCloudinary(
        req.files.video[0].buffer,
        "video"
      );

      videoUrl = result.secure_url;
    }

    const landlord = await Landlord.create({
      ...req.body,
      images: imageUrls,
      video: videoUrl,
    });

    res.status(201).json({
      success: true,
      message: "Landlord lead created successfully",
      data: landlord,
    });
  } catch (error) {
    console.log(
      "========== LANDLORD ERROR =========="
    );

    console.dir(error, { depth: null });

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateLandlordPackage = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { packageSelected } = req.body;

    const landlord =
      await Landlord.findByIdAndUpdate(
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

    await sendLeadEmails(
      landlord,
      "Landlord"
    );

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