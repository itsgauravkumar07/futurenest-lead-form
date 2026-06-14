const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  createSeller,
  updateSellerPackage,
} = require("../controllers/sellerController");

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
  createSeller
);

router.patch(
  "/:id/package",
  updateSellerPackage
);

module.exports = router;