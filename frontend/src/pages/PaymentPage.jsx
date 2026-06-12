import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import QR from "../assets/qr-code.png";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

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
Hello FutureNest Team,

I have completed the payment.

Package: ${packageData.packageName}
Amount: ₹${packageData.amount}

I am attaching the payment screenshot for verification.
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
    alert("UPI ID copied");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            Complete Your Payment
          </h1>

          <p className="text-slate-600 mt-3">
            Secure your package and get started with
            FutureNest services.
          </p>
        </div>

        {/* Package Summary */}

        <div className="bg-white rounded-3xl border p-6 shadow-sm mb-6">
          <p className="text-sm text-slate-500">
            Selected Package
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {packageData.packageName}
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
              Scan & Pay
            </h3>

            <div className="border rounded-2xl p-4 bg-slate-50">
              <img
                src={QR}
                alt="Payment QR"
                className="w-full max-w-xs mx-auto"
              />
            </div>

            <p className="text-sm text-slate-500 text-center mt-4">
              Scan the QR code using any UPI app.
            </p>

          </div>

          {/* UPI Details */}

          <div className="bg-white rounded-3xl border p-6 shadow-sm">

            <h3 className="text-xl font-semibold mb-4">
              UPI Payment
            </h3>

            <div className="bg-slate-50 border rounded-2xl p-4">

              <p className="text-sm text-slate-500">
                UPI ID
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
                  Copy
                </button>

              </div>

            </div>

            <div className="mt-6">

              <h4 className="font-semibold mb-3">
                Payment Process
              </h4>

              <div className="space-y-3 text-sm text-slate-600">

                <div>1. Scan QR or pay via UPI ID</div>

                <div>2. Complete payment</div>

                <div>3. Take payment screenshot</div>

                <div>
                  4. Send screenshot on WhatsApp
                </div>

                <div>
                  5. Our team verifies payment
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Verification Section */}

        <div className="bg-white rounded-3xl border p-6 shadow-sm mt-6">

          <h3 className="text-xl font-semibold text-center">
            Payment Verification
          </h3>

          <p className="text-slate-600 text-center mt-3">
            After completing the payment, send us
            the screenshot on WhatsApp for manual
            verification.
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
              Send Screenshot on WhatsApp
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
              I've Already Sent It
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default PaymentPage;