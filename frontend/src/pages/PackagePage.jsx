import { useNavigate, useParams } from "react-router-dom";

import PackageCard from "../components/PackageCard";
import { packages } from "../data/packages";
import API from "../services/api";

function PackagePage() {
  const { role } = useParams();
  const navigate = useNavigate();

  const currentPackages = packages[role] || [];

  const handlePackageSelect = async (pkg) => {
    try {
      if (pkg.type === "contact") {
        window.open(
          "https://wa.me/919999999999",
          "_blank"
        );
        return;
      }

      const leadId = localStorage.getItem(
        `${role}LeadId`
      );

      if (!leadId) {
        alert("Lead not found");
        return;
      }

      let endpoint = "";

      switch (role) {
        case "seller":
          endpoint = `/sellers/${leadId}/package`;
          break;

        case "landlord":
          endpoint = `/landlords/${leadId}/package`;
          break;

        case "tenant":
          endpoint = `/tenants/${leadId}/package`;
          break;

        default:
          alert("Invalid role");
          return;
      }

      await API.patch(endpoint, {
        packageSelected: pkg.title,
      });

      const packageData = {
        role,
        packageName: pkg.title,
        amount: pkg.price,
      };

      localStorage.setItem(
        "selectedPackage",
        JSON.stringify(packageData)
      );

      navigate("/payment", {
        state: packageData,
      });
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to update package"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}

        <button
          onClick={() => navigate(-1)}
          className="
            mb-8
            text-green-600
            font-medium
            hover:text-green-700
          "
        >
          ← Back
        </button>

        {/* Header */}

        <div className="text-center mb-12">

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900">
            Choose Your Package
          </h1>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Select the package that best matches
            your property requirements.
          </p>

        </div>

        {/* Packages */}

        <div
          className={`grid gap-6 ${
            currentPackages.length === 1
              ? "max-w-md mx-auto"
              : "md:grid-cols-3"
          }`}
        >
          {currentPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              title={pkg.title}
              price={pkg.price}
              features={pkg.features}
              buttonText={pkg.buttonText}
              popular={pkg.popular}
              onClick={() =>
                handlePackageSelect(pkg)
              }
            />
          ))}
        </div>

        {/* Help Section */}

        <div className="mt-16">
          <div
            className="
              bg-white
              rounded-3xl
              border
              border-slate-200
              p-8
              text-center
              shadow-sm
            "
          >
            <h2 className="text-2xl font-bold">
              Need Help Choosing?
            </h2>

            <p className="text-slate-600 mt-3">
              Talk to our property consultant and
              we'll help you select the right plan.
            </p>

            <button
              onClick={() =>
                window.open(
                  "https://wa.me/919999999999",
                  "_blank"
                )
              }
              className="
                mt-6
                bg-green-500
                hover:bg-green-600
                text-white
                px-8
                py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              Chat on WhatsApp
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PackagePage;