const express = require("express");
const router = express.Router();
const upload = require("../middleware//upload");
const cloudinary = require("../config/cloundinary");

router.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      const file = req.file;

      const base64 = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;

      const result = await cloudinary.uploader.upload(base64, {
        resource_type: "auto",
      });

      res.status(200).json({
        success: true,
        url: result.secure_url,
        public_id: result.public_id,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;