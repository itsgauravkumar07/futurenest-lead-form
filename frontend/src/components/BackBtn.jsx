// components/BackButton.jsx

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeft } from 'lucide-react';

function BackButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button
      onClick={() => navigate(-1)}
      className="
        mb-6
        text-gray-500
        font-medium
        hover:text-gray-700
        bg-white
        rounded-full
        shadow
        w-10
        h-10
        flex justify-center items-center
      "
    >
     <ChevronLeft />
    </button>
  );
}

export default BackButton;