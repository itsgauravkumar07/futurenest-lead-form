const express = require("express");

const { createBuyer } = require("../controllers/buyerController");

const router = express.Router();

router.post("/", createBuyer);

module.exports = router;