import { Routes, Route } from "react-router-dom";

import QuestionPage from "./pages/QuestionPage";
import FormPage from "./pages/FormPage";
import PackagePage from "./pages/PackagePage";
import SuccessPage from "./pages/SuccessPage";
import PaymentPage from "./pages/PaymentPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<QuestionPage />} />
        <Route path="/form/:role" element={<FormPage />} />
        <Route path="/packages/:role" element={<PackagePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </>
    
  );
}

export default App;