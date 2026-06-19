const Tenant = require("../models/Tenant");

const sendLeadEmails = require(
  "../utils/sendLeadEmail"
);

const createTenant = async (req, res) => {
  try {
    const tenant = await Tenant.create(req.body);

    res.status(201).json({
      success: true,
      message: "Tenant lead created successfully",
      data: tenant,
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTenantPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { packageSelected } = req.body;

    const tenant = await Tenant.findByIdAndUpdate(
      id,
      {
        packageSelected,
      },
      {
        new: true,
      }
    );

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
      });
    }

    await sendLeadEmails(
      tenant,
      "Tenant"
    )

    res.status(200).json({
      success: true,
      message: "Package updated successfully",
      data: tenant,
    });
  } catch (error) {

    console.log("========== TENANT ERROR ==========");
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTenant,
  updateTenantPackage,
};