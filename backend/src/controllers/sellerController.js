const Seller = require("../models/Seller");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

const sendLeadEmails = require(
  "../utils/sendLeadEmail"
);

const createSeller = async (req, res) => {
  try {
    const imageUrls = [];
    let videoUrl = "";

    // Upload Images

    if (req.files?.images) {
      for (const file of req.files.images) {
        const result =
          await uploadToCloudinary(
            file.buffer,
            "image"
          );

        imageUrls.push(
          result.secure_url
        );
      }
    }

    // Upload Video

    if (req.files?.video?.[0]) {
      const result =
        await uploadToCloudinary(
          req.files.video[0].buffer,
          "video"
        );

      videoUrl = result.secure_url;
    }

    const seller = await Seller.create({
      ...req.body,
      images: imageUrls,
      video: videoUrl,
    });

    res.status(201).json({
      success: true,
      message:
        "Seller lead created successfully",
      data: seller,
    });
  } catch (error) {
    console.log(
      "========== SELLER ERROR =========="
    );

    console.dir(error, {
      depth: null,
    });

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateSellerPackage = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { packageSelected } =
      req.body;

    const seller =
      await Seller.findByIdAndUpdate(
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

      await sendLeadEmails(
        seller,
        "Seller"
      );

    res.status(200).json({
      success: true,
      message:
        "Package updated successfully",
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