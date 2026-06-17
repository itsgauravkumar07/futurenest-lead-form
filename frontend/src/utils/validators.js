export const validateForm = (
  formData,
  rules
) => {
  const errors = {};

  if (!formData.propertyCategory) {
    errors.propertyCategory =
      "Please select a property category";

    return errors;
  }

  if (
    !formData.propertyType &&
    !formData.requirementType
  ) {
    errors.propertyType =
      "Please select a property type";

    return errors;
  }

  return errors;
};