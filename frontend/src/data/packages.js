import seller100QR from "../assets/qr/qr_1999.png";
import seller300QR from "../assets/qr/qr_4999.png";
import tenantFinderService from "../assets/qr/qr_1499.png";

export const packages = {
  seller: [
    {
      id: 1,
      title: "packages.seller100Leads",
      price: "₹ 1999",
      amount: 1999,
      qrImage: seller100QR,
      features: [
        "packages.upTo100Leads",
        "packages.directBuyerContact",
        "packages.fasterExposure",
      ],
      buttonText: "packages.selectPlan",
      type: "payment",
    },

    {
      id: 2,
      title: "packages.seller300Leads",
      price: "₹ 4999",
      amount: 4999,
      qrImage: seller300QR,
      features: [
        "packages.upTo300Leads",
        "packages.directBuyerContact",
        "packages.maximumVisibility",
      ],
      buttonText: "packages.selectPlan",
      popular: true,
      type: "payment",
    },

    {
      id: 3,
      title: "packages.sellOnCommission",
      price: "Pay On Success",
      features: [
        "packages.noUpfrontPayment",
        "packages.weMarketProperty",
        "packages.payAfterSale",
      ],
      buttonText: "packages.contactUs",
      type: "contact",
    },
  ],

  landlord: [
    {
      id: 1,
      title: "packages.tenantFinderService",
      price: "₹ 1999",
      amount: 1999,
      qrImage: seller100QR,
      features: [
        "packages.upTo20TenantLeads",
        "packages.tenantContactDetails",
        "packages.tenantVerification",
      ],
      buttonText: "packages.proceedToPayment",
      popular: true,
      type: "payment",
    },

    {
      id: 2,
      title: "packages.rentOnCommission",
      price: "Pay On Success",
      features: [
        "packages.noUpfrontPayment",
        "packages.weMarketProperty",
        "packages.payAfterTenantFound",
      ],
      buttonText: "packages.contactUs",
      type: "contact",
    },
  ],

  tenant: [
    {
      id: 1,
      title: "packages.houseHuntingService",
      price: "₹ 1499",
      amount: 1499,
      qrImage: tenantFinderService,
      features: [
        "packages.personalizedSearch",
        "packages.rentalAssistance",
        "packages.moneyBack",
      ],
      buttonText: "packages.proceedToPayment",
      type: "payment",
    },
  ],
};