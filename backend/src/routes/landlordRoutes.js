const express = require("express");

const router = express.Router();

const {
  createLandlord,
  updateLandlordPackage,
} = require("../controllers/landlordController");

router.post("/", createLandlord);
router.patch(
  "/:id/package",
  updateLandlordPackage
);

module.exports = router;