export const packages = {
  seller: [
    {
      id: 1,
      title: "100 Buyer Leads",
      price: 1999,
      features: [
        "Up to 100 buyer leads",
        "Direct buyer contact details",
        "Faster property exposure",
      ],
      buttonText: "Select Plan",
      type: "payment",
    },

    {
      id: 2,
      title: "300 Buyer Leads",
      price: 4999,
      features: [
        "Up to 300 buyer leads",
        "Direct buyer contact details",
        "Maximum property visibility",
      ],
      buttonText: "Select Plan",
      popular: true,
      type: "payment",
    },

    {
      id: 3,
      title: "Sell On Commission",
      price: 0,
      features: [
        "No upfront payment",
        "We market your property",
        "Pay only after successful sale",
      ],
      buttonText: "Contact Us",
      type: "contact",
    },
  ],

  landlord: [
    {
      id: 1,
      title: "Tenant Finder Service",
      price: 2000,
      features: [
        "One Time Fee",
        "Valid Until Tenant Found",
        "Tenant Verification Support",
      ],
      buttonText: "Proceed To Payment",
      type: "payment",
    },
  ],

  tenant: [
    {
      id: 1,
      title: "House Hunting Service",
      price: 1500,
      features: [
        "Personalized Property Search",
        "Rental Property Assistance",
        "Money Back Within 30 Days*",
      ],
      buttonText: "Proceed To Payment",
      type: "payment",
    },
  ],
};