function PropertyCategorySelector({
  value,
  onChange,
}) {
  const categories = [
    "Residential",
    "Commercial",
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Property Category
        <span className="text-red-500 ml-1">*</span>
      </label>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() =>
              onChange({
                target: {
                  name: "propertyCategory",
                  value: category,
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
                value === category
                  ? "bg-green-100 border-green-500 text-green-700"
                  : "border-gray-300 hover:border-green-400"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PropertyCategorySelector;