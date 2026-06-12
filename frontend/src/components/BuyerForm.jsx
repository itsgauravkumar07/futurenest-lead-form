import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import FormSection from "../components/form-components/FormSection";
import InputField from "../components/form-components/InputFields";
import PropertyTypeSelector from "../components/form-components/PropertyTypeSelector";
import SubmitButton from "../components/form-components/SubmitButton";

function BuyerForm() {
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
    propertyType: "",
    budget: "",
    preferredLocation: "",
    additionalRequirements: "",
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
      await API.post("/buyers", formData);

      navigate("/success", {
        state: {
          role: "buyer",
          packageName: "Free Buyer Service",
        },
      });
    } catch (error) {
      console.error(error);
      alert("Failed to submit form");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Find Your Dream Property
          </h1>

          <p className="text-gray-600 mt-2">
            Tell us your requirements and our team
            will help you find the perfect property.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
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
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </FormSection>

          <FormSection
            title="Address Information"
            description="Tell us your current address."
          >
            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-xl p-3"
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

          <FormSection
            title="Property Requirements"
            description="Tell us what you're looking for."
          >
            <div className="space-y-4">

              <PropertyTypeSelector
                value={formData.propertyType}
                onChange={handleChange}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <InputField
                  label="Budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                />

                <InputField
                  label="Preferred Location"
                  name="preferredLocation"
                  value={formData.preferredLocation}
                  onChange={handleChange}
                />
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Additional Requirements"
            description="Share any special requirements."
          >
            <textarea
              name="additionalRequirements"
              value={formData.additionalRequirements}
              onChange={handleChange}
              rows="5"
              placeholder="Near school, parking, gated society..."
              className="w-full border border-gray-300 rounded-xl p-3"
            />
          </FormSection>

          <div className="flex justify-center">
            <SubmitButton text="Find My Property" />
          </div>

        </form>
      </div>
    </div>
  );
}

export default BuyerForm;