import { useTranslation } from "react-i18next";

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
}) {
  const { t } = useTranslation();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {t(label)}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder ? t(placeholder) : ""}
        className="
          w-full
          border
          border-gray-300
          rounded-xl
          px-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-green-500
          focus:border-green-500
        "
      />
    </div>
  );
}

export default InputField;