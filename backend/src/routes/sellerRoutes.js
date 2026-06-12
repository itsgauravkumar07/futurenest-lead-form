const express = require("express");

const router = express.Router();

const {
  createSeller,
  updateSellerPackage,
} = require("../controllers/sellerController");

router.post("/", createSeller);

router.patch("/:id/package", updateSellerPackage);

module.exports = router;