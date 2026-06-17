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

function TenantForm() {
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

    propertyCategory: "",
    requirementType: "",
    preferredLocation: "",
    monthlyBudget: "",
    moveInDate: "",

    occupation: "",

    additionalRequirements: "",

    packageSelected: "House Hunting Service",
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

         <div className="text-center mb-8 flex">
          <div>
            <BackButton />
          </div>
  
          <div className=" w-full">
            <h1 className="text-3xl md:text-4xl font-bold">
              {t("tenant.title")}
            </h1>
  
            <p className="text-gray-600 mt-2">
              {t("tenant.subtitle")}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Personal Information */}

          <FormSection
            title="tenant.personalInfo"
            description="tenant.personalInfoDesc"
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
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </FormSection>

          {/* Address Information */}

          <FormSection
            title="tenant.currentAddress"
            description="tenant.currentAddressDesc"
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
                    p-3
                  "
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

          {/* Rental Requirements */}

          <FormSection
            title="tenant.requirements"
            description="tenant.requirementsDesc"
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
                  label="tenant.preferredLocation"
                  name="preferredLocation"
                  value={formData.preferredLocation}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="tenant.monthlyBudget"
                  type="number"
                  name="monthlyBudget"
                  value={formData.monthlyBudget}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="tenant.occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                />

              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("tenant.moveInDate")}
                </label>

                <input
                  type="date"
                  name="moveInDate"
                  value={formData.moveInDate}
                  onChange={handleChange}
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
            title="tenant.additionalRequirements"
            description="tenant.additionalRequirementsDesc"
          >
            <textarea
              name="additionalRequirements"
              value={formData.additionalRequirements}
              onChange={handleChange}
              rows="5"
              placeholder={t("tenant.additionalRequirementsPlaceholder")}
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
              {t("tenant.service")}
            </span>
          </div>

          {/* Submit Button */}

          <div className="flex justify-center">
            <SubmitButton text="common.continue" />
          </div>

        </form>

      </div>
    </div>
  );
}

export default TenantForm;