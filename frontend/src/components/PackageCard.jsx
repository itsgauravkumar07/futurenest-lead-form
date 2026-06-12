function PackageCard({
  title,
  price,
  features,
  buttonText,
  popular,
  onClick,
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow p-6 ${
        popular ? "border-2 border-black" : ""
      }`}
    >
      {popular && (
        <span className="bg-black text-white px-3 py-1 rounded text-sm">
          Most Popular
        </span>
      )}

      <h2 className="text-xl font-bold mt-4">
        {title}
      </h2>

      <div className="text-3xl font-bold mt-4">
        ₹{price}
      </div>

      <ul className="mt-4 space-y-2 text-gray-600">
        {features.map((feature, index) => (
          <li key={index}>
            ✓ {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={onClick}
        className={`mt-6 w-full py-3 rounded-lg text-white ${
          buttonText === "Contact Us"
            ? "bg-green-600"
            : "bg-black"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default PackageCard;