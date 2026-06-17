import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import API from "../../services/api";

import FormSection from "../form-components/FormSection";
import InputField from "../form-components/InputFields";
import PropertyTypeSelector from "../form-components/PropertyTypeSelector";
import SubmitButton from "../form-components/SubmitButton";
import BackButton from "../BackBtn";

import PropertyCategorySelector from "../form-components/PropertyCategorySelector";

import { validateForm } from "../../utils/validators"

function BuyerForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [errors, setErrors] = useState({});
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
  const { name, value } = e.target;

    if (errors[name]) {
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  setFormData((prev) => {
    // Property Category Change
    if (name === "propertyCategory") {
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
  }

    return;
  }

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

      
        {/* Header */}

        <div className="text-center mb-8 flex">

        <div>
          <BackButton />
        </div>

        <div className=" w-full">
          <h1 className="text-3xl md:text-4xl font-bold">
            {t("buyer.title")}
          </h1>

          <p className="text-gray-600 mt-2">
            {t("buyer.subtitle")}
          </p>
        </div>
          
          
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Personal Information */}

          <FormSection
            title="buyer.personalInfo"
            description="buyer.personalInfoDesc"
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
            title="buyer.addressInfo"
            description="buyer.addressInfoDesc"
          >
            <div className="space-y-4">

              <div className="grid md:grid-cols-3 gap-4">

                <InputField
                  label="common.city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>
          </FormSection>

          {/* Property Requirements */}

          <FormSection
            title="buyer.propertyRequirements"
            description="buyer.propertyRequirementsDesc"
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
                  label="buyer.budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="buyer.preferredLocation"
                  name="preferredLocation"
                  value={formData.preferredLocation}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>
          </FormSection>

          {/* Additional Requirements */}

          <FormSection
            title="buyer.additionalRequirements"
            description="buyer.additionalRequirementsDesc"
          >
            <textarea
              name="additionalRequirements"
              value={formData.additionalRequirements}
              onChange={handleChange}
              rows="5"
              placeholder={t("buyer.additionalRequirementsPlaceholder")}
              className="w-full border border-gray-300 rounded-xl p-3"
            />
          </FormSection>

          <div className="flex justify-center">
            <SubmitButton text="common.submit" />
          </div>

        </form>

      </div>
    </div>
  );
}

export default BuyerForm;