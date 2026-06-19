const sendEmail = require("../utils/sendEmail");

const {
customerTemplate,
adminTemplate,
} = require("../utils/emailTemplates");

const Seller = require("../models/Seller");
const Landlord = require("../models/LandLord");
const Tenant = require("../models/Tenant");

const sendConfirmationEmail = async (
req,
res
) => {
try {
const { role, leadId } = req.body;

let lead = null;

if (role === "seller") {
  lead = await Seller.findById(leadId);
}

if (role === "landlord") {
  lead = await Landlord.findById(leadId);
}

if (role === "tenant") {
  lead = await Tenant.findById(leadId);
}

if (!lead) {
  return res.status(404).json({
    success: false,
    message: "Lead not found",
  });
}

if (lead.email) {
  await sendEmail({
    to: lead.email,
    subject: "FutureNest Registration",
    html: customerTemplate(
      lead,
      role
    ),
  });
}

await sendEmail({
  to: process.env.ADMIN_EMAIL,
  subject: `New ${role} Lead`,
  html: adminTemplate(
    role,
    lead
  ),
});

res.json({
  success: true,
});

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

module.exports = {
sendConfirmationEmail,
};
