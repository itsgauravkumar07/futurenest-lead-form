const sendEmail = require("./sendEmail");

const {
  customerTemplate,
  adminTemplate,
} = require("./emailTemplates");

const sendLeadEmails = async (
  lead,
  role
) => {
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
};

module.exports = sendLeadEmails;