import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SuccessPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white max-w-lg w-full p-8 rounded-xl shadow text-center">

        <div className="text-5xl mb-4">🎉</div>

        <h1 className="text-3xl font-bold mb-4">
          {t("success.title")}
        </h1>

        <p className="text-gray-600 mb-6">
          {t("success.description")}
        </p>

        <div className="space-y-3">

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer"
            className="block w-full bg-green-600 text-white py-3 rounded-lg"
          >
            {t("success.whatsapp")}
          </a>

          <a
            href="tel:+919999999999"
            className="block w-full bg-black text-white py-3 rounded-lg"
          >
            {t("success.call")}
          </a>

          <Link
            to="/"
            className="block w-full border py-3 rounded-lg"
          >
            {t("success.home")}
          </Link>

        </div>

      </div>
    </div>
  );
}

export default SuccessPage;