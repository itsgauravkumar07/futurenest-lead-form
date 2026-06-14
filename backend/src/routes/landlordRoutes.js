
const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

const {
  createLandlord,
  updateLandlordPackage
} = require("../controllers/landlordController");

router.post(
  "/",
  upload.fields([
    {
      name: "images",
      maxCount: 5,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  createLandlord
);

router.patch(
  "/:id/package",
  updateLandlordPackage
);


module.exports = router;