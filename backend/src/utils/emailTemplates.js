const customerTemplate = (lead, role) => {
return ` <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto;">

  <h2>Welcome to FutureNest 🏡</h2>

  <p>Hello <strong>${lead.fullName}</strong>,</p>

  <p>
    Thank you for registering with FutureNest.
  </p>

  <p>
    We have successfully received your <strong>${role}</strong> request.
  </p>

  <h3>Your Submitted Details</h3>

  <table style="border-collapse: collapse; width: 100%;">
    <tr>
      <td><strong>Name:</strong></td>
      <td>${lead.fullName}</td>
    </tr>

    <tr>
      <td><strong>Mobile:</strong></td>
      <td>${lead.mobileNumber}</td>
    </tr>

    <tr>
      <td><strong>Email:</strong></td>
      <td>${lead.email || "-"}</td>
    </tr>

    <tr>
      <td><strong>Package:</strong></td>
      <td>${lead.packageSelected || "Not Selected Yet"}</td>
    </tr>
  </table>

  <br>

  <p>
    Our team will review your details and contact you shortly.
  </p>

  <p>
    Thank you for choosing FutureNest.
  </p>

  <br>

  <p>
    Regards,<br>
    <strong>FutureNest Team</strong>
  </p>

</div>

`;
};

const adminTemplate = (role, lead) => {
return ` <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 700px; margin: auto;">

  <h2>🚨 New ${role} Lead Received</h2>

  <h3>Contact Details</h3>

  <p><strong>Name:</strong> ${lead.fullName}</p>

  <p><strong>Mobile:</strong> ${lead.mobileNumber}</p>

  <p><strong>WhatsApp:</strong> ${lead.whatsappNumber || "-"}</p>

  <p><strong>Email:</strong> ${lead.email || "-"}</p>

  <p><strong>Package:</strong> ${lead.packageSelected || "Not Selected"}</p>

  <hr>

  <h3>Property Details</h3>

  <p>
    <strong>Property Category:</strong>
    ${lead.propertyCategory || "-"}
  </p>

  <p>
    <strong>Property Type:</strong>
    ${lead.propertyType || "-"}
  </p>

  <p>
    <strong>Property Location:</strong>
    ${lead.propertyLocation || lead.preferredLocation || "-"}
  </p>

  <p>
    <strong>Budget / Price / Rent:</strong>
    ${
      lead.expectedSellingPrice ||
      lead.monthlyRent ||
      lead.monthlyBudget ||
      lead.budget ||
      "-"
    }
  </p>

  <p>
    <strong>Additional Details:</strong>
    ${
      lead.additionalDetails ||
      lead.additionalRequirements ||
      "-"
    }
  </p>

  <hr>

  <p>
    <strong>Lead Created At:</strong>
    ${new Date().toLocaleString()}
  </p>

</div>

`;
};

module.exports = {
customerTemplate,
adminTemplate,
};
