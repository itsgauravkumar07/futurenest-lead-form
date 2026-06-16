import { useParams } from "react-router-dom";

import BuyerForm from "../components/forms/BuyerForm";
import SellerForm from "../components/forms/SellerForm";
import LandLordForm from "../components/forms/LandLordForm";
import TenantForm from "../components/forms/TenantForm";

function FormPage() {
  const { role } = useParams();

  return (
    <div className="min-h-screen">
      {role === "buyer" && <BuyerForm />}
      {role === "seller" && <SellerForm />}
      {role === "landlord" && <LandLordForm />}
      {role === "tenant" && <TenantForm />}
    </div>
  );
}

export default FormPage;