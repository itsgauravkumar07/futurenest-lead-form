const express = require("express");

const router = express.Router();
const {
  createTenant,
  updateTenantPackage,
} = require("../controllers/tenantController");

router.post("/", createTenant);

router.patch(
  "/:id/package",
  updateTenantPackage
);

module.exports = router;