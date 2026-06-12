import { useParams } from "react-router-dom";

import BuyerForm from "../components/BuyerForm";
import SellerForm from "../components/SellerForm";
import LandLordForm from "../components/LandLordForm";
import TenantForm from "../components/TenantForm";

function FormPage() {
  const { role } = useParams();

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      {role === "buyer" && <BuyerForm />}
      {role === "seller" && <SellerForm />}
      {role === "landlord" && <LandLordForm />}
      {role === "tenant" && <TenantForm />}
    </div>
  );
}

export default FormPage;