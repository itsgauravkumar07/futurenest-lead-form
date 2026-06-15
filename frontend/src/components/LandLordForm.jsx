import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import { useTranslation } from "react-i18next";

import FormSection from "./form-components/FormSection";
import InputField from "./form-components/InputFields";
import PropertyTypeSelector from "./form-components/PropertyTypeSelector";
import SubmitButton from "./form-components/SubmitButton";

function LandLordForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [loading, setLoading] =
  useState(false);

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
      "monthlyRent",
      formData.monthlyRent
    );

    formDataToSend.append(
      "availableFrom",
      formData.availableFrom
    );

    formDataToSend.append(
      "additionalDetails",
      formData.additionalDetails
    );

    formDataToSend.append(
      "packageSelected",
      formData.packageSelected
    );

    // Images
    formData.images.forEach((image) => {
      formDataToSend.append(
        "images",
        image
      );
    });

    // Video
    if (formData.video) {
      formDataToSend.append(
        "video",
        formData.video
      );
    }

    const response = await API.post(
      "/landlords",
      formDataToSend,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    localStorage.setItem(
      "landlordLeadId",
      response.data.data._id
    );
    setLoading(false);
    navigate("/packages/landlord");
  } catch (error) {
    setLoading(false);
    console.error(error);
    alert("Failed to submit form");
  }
};

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            {t("landlord.title")}
          </h1>

          <p className="text-gray-600 mt-2">
            {t("landlord.subtitle")}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Personal Information */}

          <FormSection
            title="landlord.personalInfo"
            description="landlord.personalInfoDesc"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="common.fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />

              <InputField
                label="common.mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />

              <InputField
                label="common.whatsappNumber"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                required
              />

              <InputField
                label="common.email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </FormSection>

          {/* Address Information */}

          <FormSection
            title="landlord.addressInfo"
            description="landlord.addressInfoDesc"
          >
            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("common.address")}
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
                  label="common.city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="common.state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="common.pinCode"
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
            title="landlord.propertyDetails"
            description="landlord.propertyDetailsDesc"
          >
            <div className="space-y-4">

              <PropertyTypeSelector
                value={formData.propertyType}
                onChange={handleChange}
              />

              <div className="grid md:grid-cols-2 gap-4">

                <InputField
                  label="landlord.propertyLocation"
                  name="propertyLocation"
                  value={formData.propertyLocation}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="landlord.monthlyRent"
                  name="monthlyRent"
                  type="number"
                  value={formData.monthlyRent}
                  onChange={handleChange}
                  required
                />

              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("landlord.availableFrom")}
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
            title="landlord.additionalDetails"
            description="landlord.additionalDetailsDesc"
          >
            <textarea
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              rows="5"
              placeholder={t("landlord.additionalDetailsPlaceholder")}
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
  title="landlord.mediaTitle"
  description="landlord.mediaDesc"
>
  <div className="space-y-6">

    {/* Images Upload */}

    <div>
      <label className="block text-sm font-medium mb-2">
        {t("landlord.propertyImages")}
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
            {t("landlord.uploadImages")}
          </p>

          <p className="text-sm text-gray-500">
            {t("landlord.imageFormats")}
          </p>

          {formData.images.length > 0 && (
            <p className="text-green-600 font-medium">
              {formData.images.length} {t("landlord.imagesSelected")}
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
        {t("landlord.propertyVideo")}
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
            {t("landlord.uploadVideo")}
          </p>

          <p className="text-sm text-gray-500">
            {t("landlord.videoFormats")}
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
        {t("landlord.remove")}
      </button>

    </div>

  </div>
)}
  </div>
          </FormSection>
          

          <div className="flex justify-center">
            <SubmitButton 
            text="common.continue"
            loading={loading} />
          </div>

        </form>
      </div>
    </div>
  );
}

export default LandLordForm;