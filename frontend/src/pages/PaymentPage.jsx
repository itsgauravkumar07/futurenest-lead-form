import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import QR from "../assets/qr-code.png";
import { useTranslation } from "react-i18next";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const packageData =
    location.state ||
    JSON.parse(localStorage.getItem("selectedPackage"));

  useEffect(() => {
    if (!packageData) {
      navigate("/");
    }
  }, [packageData, navigate]);

  if (!packageData) return null;

  const whatsappNumber = "919999999999";

const whatsappMessage = `
${t("payment.whatsappMessage")} ${t(packageData.packageName)}

${t("payment.amount")}: ₹${packageData.amount}

${t("payment.verificationLine")}
`;

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`,
      "_blank"
    );
  };

const copyUPI = () => {
  navigator.clipboard.writeText("futurenest@upi");
  alert(t("payment.upiCopied"));
};

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            {t("payment.title")}
          </h1>

          <p className="text-slate-600 mt-3">
            {t("payment.subtitle")}
          </p>
        </div>

        {/* Package Summary */}

        <div className="bg-white rounded-3xl border p-6 shadow-sm mb-6">
          <p className="text-sm text-slate-500">
            {t("payment.selectedPackage")}
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {t(packageData.packageName)}
          </h2>

          <div className="text-4xl font-bold text-green-600 mt-4">
            ₹{packageData.amount}
          </div>
        </div>

        {/* Payment Section */}

        <div className="grid md:grid-cols-2 gap-6">

          {/* QR */}

          <div className="bg-white rounded-3xl border p-6 shadow-sm">

            <h3 className="text-xl font-semibold mb-4">
              {t("payment.scanPay")}
            </h3>

            <div className="border rounded-2xl p-4 bg-slate-50">
              <img
                src={QR}
                alt="Payment QR"
                className="w-full max-w-xs mx-auto"
              />
            </div>

            <p className="text-sm text-slate-500 text-center mt-4">
              {t("payment.scanQrDesc")}
            </p>

          </div>

          {/* UPI Details */}

          <div className="bg-white rounded-3xl border p-6 shadow-sm">

            <h3 className="text-xl font-semibold mb-4">
              {t("payment.upiPayment")}
            </h3>

            <div className="bg-slate-50 border rounded-2xl p-4">

              <p className="text-sm text-slate-500">
                {t("payment.upiId")}
              </p>

              <div className="flex items-center justify-between mt-2">

                <span className="font-semibold">
                  futurenest@upi
                </span>

                <button
                  onClick={copyUPI}
                  className="
                    bg-green-500
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    text-sm
                  "
                >
                  {t("payment.copy")}
                </button>

              </div>

            </div>

            <div className="mt-6">

              <h4 className="font-semibold mb-3">
                {t("payment.paymentProcess")}
              </h4>

              <div className="space-y-3 text-sm text-slate-600">

                <div>1. {t("payment.step1")}</div>
                <div>2. {t("payment.step2")}</div>
                <div>3. {t("payment.step3")}</div>
                <div>4. {t("payment.step4")}</div>
                <div>5. {t("payment.step5")}</div>

              </div>

            </div>

          </div>

        </div>

        {/* Verification Section */}

        <div className="bg-white rounded-3xl border p-6 shadow-sm mt-6">

          <h3 className="text-xl font-semibold text-center">
            {t("payment.verificationTitle")}
          </h3>

          <p className="text-slate-600 text-center mt-3">
           {t("payment.verificationDesc")}
          </p>

          <div className="mt-6 flex flex-col md:flex-row gap-4">

            <button
              onClick={openWhatsApp}
              className="
                flex-1
                bg-green-500
                hover:bg-green-600
                text-white
                py-4
                rounded-xl
                font-semibold
                transition
              "
            >
              {t("payment.sendScreenshot")}
            </button>

            <button
              onClick={() => navigate("/success")}
              className="
                flex-1
                border
                py-4
                rounded-xl
                font-semibold
                hover:bg-slate-50
                transition
              "
            >
              {t("payment.alreadySent")}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default PaymentPage;