import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import FormSection from "./form-components/FormSection";
import InputField from "./form-components/InputFields";
import PropertyTypeSelector from "./form-components/PropertyTypeSelector";
import SubmitButton from "./form-components/SubmitButton";

function TenantForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    whatsappNumber: "",
    email: "",

    address: "",
    city: "",
    state: "",
    pinCode: "",

    requirementType: "",
    preferredLocation: "",
    monthlyBudget: "",
    moveInDate: "",
    additionalRequirements: "",

    packageSelected: "House Hunting Service",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/tenants", {
        ...formData,
      });

      localStorage.setItem(
        "tenantLeadId",
        response.data.data._id
      );

      navigate("/packages/tenant");
    } catch (error) {
      console.error(error);
      alert("Failed to submit form");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Find Your Next Rental Home
          </h1>

          <p className="text-gray-600 mt-2">
            Tell us your requirements and we'll
            help you find the perfect rental property.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Personal Information */}

          <FormSection
            title="Personal Information"
            description="Tell us how we can contact you."
          >
            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />

              <InputField
                label="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />

              <InputField
                label="WhatsApp Number"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                required
              />

              <InputField
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </FormSection>

          {/* Address Information */}

          <FormSection
            title="Current Address"
            description="Tell us where you're currently staying."
          >
            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium mb-2">
                  Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  required
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-xl
                    p-3
                  "
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">

                <InputField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="Pincode"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>
          </FormSection>

          {/* Rental Requirements */}

          <FormSection
            title="Rental Requirements"
            description="Tell us what kind of property you're looking for."
          >
            <div className="space-y-4">

              <PropertyTypeSelector
                value={formData.requirementType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    requirementType:
                      e.target.value,
                  })
                }
              />

              <div className="grid md:grid-cols-2 gap-4">

                <InputField
                  label="Preferred Location"
                  name="preferredLocation"
                  value={formData.preferredLocation}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="Monthly Budget"
                  type="number"
                  name="monthlyBudget"
                  value={formData.monthlyBudget}
                  onChange={handleChange}
                  required
                />

              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Move In Date
                </label>

                <input
                  type="date"
                  name="moveInDate"
                  value={formData.moveInDate}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-xl
                    px-4
                    py-3
                    focus:ring-2
                    focus:ring-green-500
                    focus:border-green-500
                  "
                />
              </div>

            </div>
          </FormSection>

          {/* Additional Requirements */}

          <FormSection
            title="Additional Requirements"
            description="Share any special requirements."
          >
            <textarea
              name="additionalRequirements"
              value={formData.additionalRequirements}
              onChange={handleChange}
              rows="5"
              placeholder="Furnished, Parking, Near Office, Family Friendly, Pet Friendly..."
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                p-3
              "
            />
          </FormSection>

          {/* Trust Badge */}

          <div className="text-center">
            <span className="
              inline-flex
              items-center
              px-4
              py-2
              rounded-full
              bg-green-100
              text-green-700
              text-sm
              font-medium
            ">
              House Hunting Service
            </span>
          </div>

          {/* Submit Button */}

          <div className="flex justify-center">
            <SubmitButton text="Continue" />
          </div>

        </form>

      </div>
    </div>
  );
}

export default TenantForm;