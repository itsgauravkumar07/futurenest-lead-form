import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

import FormSection from "../form-components/FormSection";
import InputField from "../form-components/InputFields";
import PropertyTypeSelector from "../form-components/PropertyTypeSelector";
import SubmitButton from "../form-components/SubmitButton";
import BackButton from "../BackBtn"
import PropertyCategorySelector from "../form-components/PropertyCategorySelector";
import { validateForm } from "../../utils/validators"


import { useTranslation } from "react-i18next";

function SellerForm() {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [errors, setErrors] = useState({});
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

    propertyCategory: "",
    propertyType: "",
    propertyLocation: "",
    expectedSellingPrice: "",
    additionalDetails: "",

    packageSelected: "",

    images: [],
    video: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setFormData((prev) => {
      // Property Category Change
      if (name === "propertyCategory") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          propertyCategory: "",
          propertyType: "",
        }));

        return {
          ...prev,
          propertyCategory: value,
          propertyType: "",
        };
      }

      // Mobile Number Change
      if (name === "mobileNumber") {
        return {
          ...prev,
          mobileNumber: value,

          whatsappNumber:
            prev.whatsappNumber === "" ||
            prev.whatsappNumber === prev.mobileNumber
              ? value
              : prev.whatsappNumber,
        };
      }

      // Default
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const rules = {
    propertyCategory: {
      required: true,
      message:
        "Please select a property category",
    },

    propertyType: {
      required: true,
      message:
        "Please select a property type",
    },
  };

  const newErrors = validateForm(
    formData,
    rules
  );

  if (formData.images.length === 0) {
  newErrors.images =
    "Please upload at least one property image";
}

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);

      if (newErrors.propertyCategory) {
    document
      .getElementById("property-category-section")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  } else if (newErrors.propertyType) {
    document
      .getElementById("property-type-section")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  } else if (newErrors.images) {
  document
    .getElementById("images-section")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
    return;
};

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
      "propertyCategory",
      formData.propertyCategory
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
  }};

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">

         <div className="text-center mb-8 flex">
          <div>
            <BackButton />
          </div>
  
          <div className=" w-full">
            <h1 className="text-3xl md:text-4xl font-bold">
              {t("seller.title")}
            </h1>
  
            <p className="text-gray-600 mt-2">
              {t("seller.subtitle")}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Personal Information */}

          <FormSection
            title="seller.personalInfo"
            description="seller.personalInfoDesc"
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
                required
              />
            </div>
          </FormSection>

          {/* Address Information */}

          <FormSection
            title="seller.addressInfo"
            description="seller.addressInfoDesc"
          >
            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("common.address")}
                  <span className="text-red-500 ml-1">*</span>
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
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-green-500
                    focus:border-green-500"
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
            title="seller.propertyDetails"
            description="seller.propertyDetailsDesc"
          >
            <div className="space-y-4">

            <div id="property-category-section">
              <PropertyCategorySelector
                value={formData.propertyCategory}
                onChange={handleChange}
              />

              {errors.propertyCategory && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.propertyCategory}
                </p>
              )}
            </div>

            <div id="property-type-section">
              <PropertyTypeSelector
                category={formData.propertyCategory}
                value={formData.propertyType}
                onChange={handleChange}
              />

              {errors.propertyType && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.propertyType}
                </p>
              )}
            </div>


              <div className="grid md:grid-cols-2 gap-4">

                <InputField
                  label="seller.propertyLocation"
                  name="propertyLocation"
                  value={formData.propertyLocation}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="seller.expectedSellingPrice"
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
            title="seller.additionalDetails"
            description="seller.additionalDetailsDesc"
          >
            <textarea
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              rows="5"
              placeholder={t("seller.additionalDetailsPlaceholder")}
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-green-500
                focus:border-green-500
              "
            />
          </FormSection>

          {/* Image and video Upload Section */}
          <FormSection
            title="seller.mediaTitle"
            description="seller.mediaDesc">

            <div className="space-y-6">

              {/* Images Upload */}

              <div id="images-section">
               <label className="block text-sm font-medium mb-2">
                  {t("seller.propertyImages")}
                  <span className="text-red-500 ml-1">*</span>
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
                      {t("seller.uploadImages")}
                    </p>

                    <p className="text-sm text-gray-500">
                      {t("seller.imageFormats")}
                    </p>

                    {formData.images.length > 0 && (
                      <p className="text-green-600 font-medium">
                        {formData.images.length} {t("seller.imagesSelected")}
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
                  onChange={(e) => {
                    setErrors((prev) => ({
                      ...prev,
                      images: "",
                    }));

                    setFormData((prev) => ({
                      ...prev,
                      images: [
                        ...prev.images,
                        ...Array.from(e.target.files),
                      ],
                    }));
                  }}
                />
              </div>

              {errors.images && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.images}
                </p>
              )}

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
        {t("seller.propertyVideo")}
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
            {t("seller.uploadVideo")}
          </p>

          <p className="text-sm text-gray-500">
           {t("seller.videoFormats")}
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
        {t("seller.remove")}
      </button>

    </div>

  </div>
)}
  </div>
          </FormSection>

          <div className="flex justify-center">
            <SubmitButton 
              text="common.continue"
              loading={loading}
            />
          </div>

        </form>
      </div>
    </div>
  );
}

export default SellerForm;