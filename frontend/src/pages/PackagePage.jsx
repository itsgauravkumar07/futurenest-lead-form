import { useNavigate, useParams } from "react-router-dom";

import { useState } from "react";

import PackageCard from "../components/PackageCard";
import { packages } from "../data/packages";
import API from "../services/api";
import { useTranslation } from "react-i18next";
import BackButton from '../components/BackBtn'
import { WHATSAPP_URL, WHATSAPP_NUMBER } from "../config/constants";

function PackagePage() {
  const { role } = useParams();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const currentPackages = packages[role] || [];

const [loadingPackage, setLoadingPackage] = useState(null);

 const handlePackageSelect = async (pkg) => {
   if (loadingPackage) return;

setLoadingPackage(pkg.id);
  
try {
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

// Update package in MongoDB
await API.patch(endpoint, {
  packageSelected: t(pkg.title),
});

// Commission Package
if (pkg.type === "contact") {
  const message = encodeURIComponent(
    `Hi FutureNest, I am interested in the ${pkg.title} package.`
  );

  navigate("/success", {
    state: {
      role,
      packageName: pkg.title,
    },
  });

  setTimeout(() => {
    window.location.href =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  }, 500);

  return;
}

// Paid Package
const packageData = {
  role,
  packageName: t(pkg.title),
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
} finally{
  setLoadingPackage(null);
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
              buttonText={
                loadingPackage === pkg.id
                  ? "Processing..."
                  : pkg.buttonText
              }
              popular={pkg.popular}
              disabled={loadingPackage === pkg.id}
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
                  WHATSAPP_URL,
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