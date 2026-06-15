import {
  House,
  Tags,
  KeyRound,
  Building2,
} from "lucide-react";

export const questionOptions = [
  {
    titleKey: "buyProperty",
    descriptionKey: "buyPropertyDesc",
    value: "buyer",
    icon: House,
  },

  {
    titleKey: "sellProperty",
    descriptionKey: "sellPropertyDesc",
    value: "seller",
    icon: Tags,
  },

  {
    titleKey: "rentOutProperty",
    descriptionKey: "rentOutPropertyDesc",
    value: "landlord",
    icon: KeyRound,
  },

  {
    titleKey: "findRentalProperty",
    descriptionKey: "findRentalPropertyDesc",
    value: "tenant",
    icon: Building2,
  },
];