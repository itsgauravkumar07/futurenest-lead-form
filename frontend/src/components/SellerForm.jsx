import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import FormSection from "./form-components/FormSection";
import InputField from "./form-components/InputFields";
import PropertyTypeSelector from "./form-components/PropertyTypeSelector";
import SubmitButton from "./form-components/SubmitButton";

function SellerForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
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
    expectedSellingPrice: "",
    additionalDetails: "",

    packageSelected: "",

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

  setLoading(true);

  try {
    const formDataToSend = new FormData();

    formDataToSend.append(
      "fullName",
      formData.fullName
    );

    formDataToSend.append(
      "mobileNumber",
      formData.mobileNumber
    );

    formDataToSend.append(
      "whatsappNumber",
      formData.whatsappNumber
    );

    formDataToSend.append(
      "email",
      formData.email
    );

    formDataToSend.append(
      "address",
      formData.address
    );

    formDataToSend.append(
      "city",
      formData.city
    );

    formDataToSend.append(
      "state",
      formData.state
    );

    formDataToSend.append(
      "pinCode",
      formData.pinCode
    );

    formDataToSend.append(
      "propertyType",
      formData.propertyType
    );

    formDataToSend.append(
      "propertyLocation",
      formData.propertyLocation
    );

    formDataToSend.append(
      "expectedSellingPrice",
      formData.expectedSellingPrice
    );

    formDataToSend.append(
      "additionalDetails",
      formData.additionalDetails
    );

    formData.images.forEach((image) => {
      formDataToSend.append(
        "images",
        image
      );
    });

    if (formData.video) {
      formDataToSend.append(
        "video",
        formData.video
      );
    }

    const response = await API.post(
      "/sellers",
      formDataToSend,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    localStorage.setItem(
      "sellerLeadId",
      response.data.data._id
    );

    setLoading(false);

    navigate("/packages/seller");
  } catch (error) {
    console.error(error);

    setLoading(false);

    alert("Failed to submit form");
  }
};

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Sell Your Property Faster
          </h1>

          <p className="text-gray-600 mt-2">
            Share your property details and connect
            with serious buyers quickly.
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
                  required
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

          {/* Property Details */}

          <FormSection
            title="Property Details"
            description="Tell us about the property you want to sell."
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
                  label="Expected Selling Price"
                  name="expectedSellingPrice"
                  type="number"
                  value={formData.expectedSellingPrice}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>
          </FormSection>

          {/* Additional Details */}

          <FormSection
            title="Additional Details"
            description="Provide more information about your property."
          >
            <textarea
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              rows="5"
              placeholder="3BHK, Parking, Furnished, Corner Property, Near Market..."
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                p-3
              "
            />
          </FormSection>

          {/* Image and video Upload Section */}
          <FormSection
  title="Property Photos & Video"
  description="Upload property photos and a video."
>
  <div className="space-y-6">

    {/* Images Upload */}

    <div>
      <label className="block text-sm font-medium mb-2">
        Property Images
      </label>

      <label
        htmlFor="images"
        className="
          block
          w-full
          border-2
          border-dashed
          border-gray-300
          rounded-xl
          p-6
          text-center
          cursor-pointer
          hover:border-green-500
          hover:bg-green-50
          transition
        "
      >
        <div className="space-y-2">

          <p className="font-medium text-gray-700">
            📷 Upload Property Photos
          </p>

          <p className="text-sm text-gray-500">
            JPG, PNG, WEBP supported
          </p>

          {formData.images.length > 0 && (
            <p className="text-green-600 font-medium">
              {formData.images.length} image(s) selected
            </p>
          )}

        </div>
      </label>

      <input
        id="images"
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            images: [
              ...prev.images,
              ...Array.from(e.target.files),
            ],
          }))
        }
      />
    </div>

    {/* Image Preview */}

    {formData.images.length > 0 && (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

        {formData.images.map((image, index) => (
          <div
            key={index}
            className="relative"
          >

            <img
              src={URL.createObjectURL(image)}
              alt={`Preview ${index + 1}`}
              className="
                h-28
                w-full
                object-cover
                rounded-xl
                border
                border-gray-200
              "
            />

            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  images: prev.images.filter(
                    (_, i) => i !== index
                  ),
                }))
              }
              className="
                absolute
                top-2
                right-2
                w-7
                h-7
                rounded-full
                bg-red-500
                text-white
                text-sm
                hover:bg-red-600
              "
            >
              ✕
            </button>

          </div>
        ))}

      </div>
    )}

    {/* Video Upload */}

    <div>
      <label className="block text-sm font-medium mb-2">
        Property Video
      </label>

      <label
        htmlFor="video"
        className="
          block
          w-full
          border-2
          border-dashed
          border-gray-300
          rounded-xl
          p-6
          text-center
          cursor-pointer
          hover:border-green-500
          hover:bg-green-50
          transition
        "
      >
        <div className="space-y-2">

          <p className="font-medium text-gray-700">
            🎥 Upload Property Video
          </p>

          <p className="text-sm text-gray-500">
            MP4, MOV supported
          </p>

          {formData.video && (
            <p className="text-green-600 font-medium break-all">
              {formData.video.name}
            </p>
          )}

        </div>
      </label>

      <input
        id="video"
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  setFormData((prev) => ({
    ...prev,
    video: file,
  }));
}}
      />
    </div>

    {/* Video Preview */}

    {formData.video && (
  <div className="space-y-3">

    <video
      controls
      className="
        w-full
        max-h-80
        rounded-xl
        border
        border-gray-200
      "
      src={URL.createObjectURL(
        formData.video
      )}
    />

    <div className="flex items-center justify-between">

      <p className="text-sm text-green-600 break-all">
        {formData.video.name}
      </p>

      <button
        type="button"
        onClick={() =>
          setFormData((prev) => ({
            ...prev,
            video: null,
          }))
        }
        className="
          px-3
          py-2
          bg-red-500
          text-white
          text-sm
          rounded-lg
          hover:bg-red-600
          transition
        "
      >
        Remove
      </button>

    </div>

  </div>
)}
  </div>
          </FormSection>

          <div className="flex justify-center">
            <SubmitButton 
              text="Continue"
              loading={loading}
            />
          </div>

        </form>
      </div>
    </div>
  );
}

export default SellerForm;