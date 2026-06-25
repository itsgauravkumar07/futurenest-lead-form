const residentialTypes = {
  seller: [
    "Flat",
    "House",
    "Villa",
    "Builder Floor",
    "Plot",
  ],

  landlord: [
    "Flat",
    "House",
    "Villa",
  ],

  tenant: [
    "Flat",
    "House",
    "Villa",
  ],
};

const commercialTypes = [
  "Shop",
  "Office",
  "Showroom",
  "Warehouse",
  "Commercial Plot",
];

function PropertyTypeSelector({
  category,
  value,
  onChange,
  role = "seller",
}) {
  let propertyTypes = [];

  if (category === "Residential") {
    propertyTypes =
      residentialTypes[role] || residentialTypes.seller;
  } else {
    propertyTypes = commercialTypes;
  }

  if (!category) return null;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Property Type
        <span className="text-red-500 ml-1">*</span>
      </label>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PropertyTypeSelector;