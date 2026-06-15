import { useTranslation } from "react-i18next";

function FormSection({
  title,
  description,
  children,
}) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-900">
          {t(title)}
        </h3>

        {description && (
          <p className="text-sm text-gray-500 mt-1">
            {t(description)}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}

export default FormSection;