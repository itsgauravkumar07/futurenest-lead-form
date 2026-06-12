import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import FormSection from "./form-components/FormSection";
import InputField from "./form-components/InputFields";
import PropertyTypeSelector from "./form-components/PropertyTypeSelector";
import SubmitButton from "./form-components/SubmitButton";

function LandLordForm() {
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
    propertyLocation: "",
    monthlyRent: "",
    availableFrom: "",
    additionalDetails: "",

    packageSelected: "Tenant Finder Service",

    images: [],
    video: null,
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
      const response = await API.post("/landlords", {
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        whatsappNumber: formData.whatsappNumber,
        email: formData.email,

        address: formData.address,
        city: formData.city,
        state: formData.state,
        pinCode: formData.pinCode,

        propertyType: formData.propertyType,
        propertyLocation: formData.propertyLocation,
        monthlyRent: formData.monthlyRent,
        availableFrom: formData.availableFrom,
        additionalDetails: formData.additionalDetails,

        packageSelected: formData.packageSelected,
      });

      localStorage.setItem(
        "landlordLeadId",
        response.data.data._id
      );

      navigate("/packages/landlord");
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
            Find Verified Tenants
          </h1>

          <p className="text-gray-600 mt-2">
            Share your property details and we'll
            connect you with suitable tenants.
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
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </FormSection>

          {/* Address Information */}

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
                  required
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

          {/* Property Details */}

          <FormSection
            title="Rental Property Details"
            description="Tell us about the property you want to rent."
          >
            <div className="space-y-4">

              <PropertyTypeSelector
                value={formData.propertyType}
                onChange={handleChange}
              />

              <div className="grid md:grid-cols-2 gap-4">

                <InputField
                  label="Property Location"
                  name="propertyLocation"
                  value={formData.propertyLocation}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="Monthly Rent"
                  name="monthlyRent"
                  type="number"
                  value={formData.monthlyRent}
                  onChange={handleChange}
                  required
                />

              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Available From
                </label>

                <input
                  type="date"
                  name="availableFrom"
                  value={formData.availableFrom}
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

          {/* Additional Details */}

          <FormSection
            title="Additional Details"
            description="Share additional property details."
          >
            <textarea
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              rows="5"
              placeholder="2BHK, Furnished, Parking Available, Family Preferred..."
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                p-3
              "
            />
          </FormSection>

          {/* Future Upload Section */}

          <FormSection
            title="Property Photos & Video"
            description="Coming soon"
          >
            <div className="bg-slate-50 border border-dashed rounded-xl p-6 text-center">
              <p className="text-gray-600">
                Property photo and video upload
                functionality will be available soon.
              </p>
            </div>
          </FormSection>

          <div className="flex justify-center">
            <SubmitButton text="Continue" />
          </div>

        </form>
      </div>
    </div>
  );
}

export default LandLordForm;