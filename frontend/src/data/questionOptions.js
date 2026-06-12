import {
  House,
  Tags,
  KeyRound,
  Building2,
} from "lucide-react";

export const questionOptions = [
  {
    title: "Buy Property",
    description:
      "Browse exclusive listings and find your dream home or investment.",
    value: "buyer",
    icon: House,
  },

  {
    title: "Sell Property",
    description:
      "Get a free valuation and list your property to reach qualified buyers.",
    value: "seller",
    icon: Tags,
  },

  {
    title: "Rent Out Property",
    description:
      "Find reliable tenants and manage your rental portfolio efficiently.",
    value: "landlord",
    icon: KeyRound,
  },

  {
    title: "Find Rental Property",
    description:
      "Discover the perfect rental home in your desired neighborhood.",
    value: "tenant",
    icon: Building2,
  },
];