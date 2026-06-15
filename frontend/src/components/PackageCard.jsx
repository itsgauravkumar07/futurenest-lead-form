import { useTranslation } from "react-i18next";

function PackageCard({
  title,
  price,
  features,
  buttonText,
  popular,
  onClick,
}) {
  const { t } = useTranslation();

  return (
    <div
      className={`bg-white rounded-xl shadow p-6 ${
        popular ? "border-2 border-black" : ""
      }`}
    >
      {popular && (
        <span className="bg-black text-white px-3 py-1 rounded text-sm">
          {t("packages.mostPopular")}
        </span>
      )}

      <h2 className="text-xl font-bold mt-4">
        {t(title)}
      </h2>

      <div className="text-3xl font-bold mt-4">
        ₹{price}
      </div>

      <ul className="mt-4 space-y-2 text-gray-600">
        {features.map((feature, index) => (
          <li key={index}>
            ✓ {t(feature)}
          </li>
        ))}
      </ul>

      <button
        onClick={onClick}
        className={`mt-6 w-full py-3 rounded-lg text-white ${
          buttonText === "packages.contactUs"
            ? "bg-green-600"
            : "bg-black"
        }`}
      >
        {t(buttonText)}
      </button>
    </div>
  );
}

export default PackageCard;