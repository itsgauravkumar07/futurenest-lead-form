import { useTranslation } from "react-i18next";

const propertyTypes = [
  "Flat",
  "House",
  "Villa",
  "Plot/Land",
];

function PropertyTypeSelector({
  value,
  onChange,
}) {
  const { t } = useTranslation();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {t("common.propertyType")}
      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {propertyTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() =>
              onChange({
                target: {
                  name: "propertyType",
                  value: type,
                },
              })
            }
            className={`
              border
              rounded-xl
              py-3
              text-sm
              font-medium
              transition
              ${
                value === type
                  ? "bg-green-100 border-green-500 text-green-700"
                  : "border-gray-300 hover:border-green-400"
              }
            `}
          >
            {t(`propertyTypes.${type}`)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PropertyTypeSelector;