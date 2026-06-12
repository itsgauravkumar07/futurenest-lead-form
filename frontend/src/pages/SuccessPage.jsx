import { Link } from "react-router-dom";

function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white max-w-lg w-full p-8 rounded-xl shadow text-center">

        <div className="text-5xl mb-4">🎉</div>

        <h1 className="text-3xl font-bold mb-4">
          Thank You!
        </h1>

        <p className="text-gray-600 mb-6">
          Your requirement has been submitted successfully.
          Our team will review your details and contact you shortly.
        </p>

        <div className="space-y-3">

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer"
            className="block w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Contact on WhatsApp
          </a>

          <a
            href="tel:+919999999999"
            className="block w-full bg-black text-white py-3 rounded-lg"
          >
            Call Us
          </a>

          <Link
            to="/"
            className="block w-full border py-3 rounded-lg"
          >
            Back to Home
          </Link>

        </div>
      </div>
    </div>
  );
}

export default SuccessPage;