export const packages = {
  seller: [
    {
      id: 1,
      title: "packages.seller100Leads",
      price: "₹ 1999",
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
      price: "₹ 2000",
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
      price: "₹ 1500",
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