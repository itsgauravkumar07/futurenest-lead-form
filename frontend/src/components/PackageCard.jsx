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
        popular ? "border-2 border-brand-secondary" : ""
      }`}
    >
      {popular && (
        <span className="bg-brand-secondary text-white px-3 py-1 rounded text-sm">
          {t("packages.mostPopular")}
        </span>
      )}

      <h2 className="text-xl font-bold mt-4 text-brand-secondary">
        {t(title)}
      </h2>

      <div className="text-3xl font-bold mt-4 text-brand-secondary">
        {price}
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
            : "bg-brand-secondary"
        }`}
      >
        {t(buttonText)}
      </button>
    </div>
  );
}

export default PackageCard;