import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <div className="relative text-center">
      <Globe
        size={16}
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-slate-500
          pointer-events-none
        "
      />

      <select
        value={i18n.language}
        onChange={(e) =>
          changeLanguage(e.target.value)
        }
        className="
          appearance-none
          bg-white
          border
          border-slate-300
          rounded-xl
          pl-9
          pr-8
          py-2
          text-sm
          font-medium
          text-slate-700
          shadow-sm
          cursor-pointer
          hover:border-green-500
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
          focus:border-green-500
          transition 
        "
      >
        <>
           <option value="en">
          हिन्दी
        </option>

        <option value="hi">
          English
        </option>
        </>
       
      </select>
    </div>
  );
}

export default LanguageSwitcher;