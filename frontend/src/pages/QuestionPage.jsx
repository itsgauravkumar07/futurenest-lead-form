import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { questionOptions } from "../data/questionOptions";

function QuestionPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSelect = (role) => {
    navigate(`/form/${role}`);
  };

  return (
    <div className="bg-slate-50 px-4 py-6 md:py-0">
      <div className="max-w-4xl mx-auto min-h-[calc(100vh-112px)] flex items-center">
      <div className="max-w-4xl mx-auto w-full">

        {/* Heading */}

        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-slate-900">
            {t("questionTitle")}
          </h1>

          <p className="text-slate-600 text-sm md:text-base mt-2 max-w-xl mx-auto">
            {t("questionSubtitle")}
          </p>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {questionOptions.map((option) => {
            const Icon = option.icon;

            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="
                  bg-white
                  border
                  border-slate-200
                  rounded-xl
                  p-4
                  text-left
                  transition-all
                  duration-300
                  hover:shadow-md
                  hover:border-green-400
                  hover:-translate-y-1
                "
              >
                <div className="flex items-start gap-3">

                  <div className="bg-green-300 p-2.5 rounded-lg shrink-0">
                    <Icon
                      size={22}
                      className="text-black"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
                      {t(option.titleKey)}
                    </h2>

                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                      {t(option.descriptionKey)}
                    </p>
                  </div>

                </div>
              </button>
            );
          })}

        </div>

      </div>
      </div>
    </div>
    
  );
}

export default QuestionPage;