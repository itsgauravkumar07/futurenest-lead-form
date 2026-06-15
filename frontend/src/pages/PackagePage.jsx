import { useNavigate, useParams } from "react-router-dom";

import PackageCard from "../components/PackageCard";
import { packages } from "../data/packages";
import API from "../services/api";
import { useTranslation } from "react-i18next";
import BackButton from '../components/BackBtn'

function PackagePage() {
  const { role } = useParams();
  const navigate = useNavigate();

  const { t } = useTranslation();

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

      {/* Header */}

         <div className="text-center mb-8 flex">
          <div>
            <BackButton />
          </div>
  
          <div className=" w-full">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-secondary">
              {t("packages.title")}
            </h1>
  
            <p className="text-brand-secondary mt-2">
              {t("packages.subtitle")}
            </p>
          </div>
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
            <h2 className="text-2xl font-bold text-brand-secondar">
               {t("packages.needHelp")}
            </h2>

            <p className="text-brand-secondary mt-3">
             {t("packages.needHelpDesc")}
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
                bg-brand-primary
                hover:bg-brand-primary-hover
                text-white
                px-8
                py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              {t("packages.chatWhatsapp")}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PackagePage;