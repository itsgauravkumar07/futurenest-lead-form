import { Routes, Route } from "react-router-dom";
import "./App.css";

import QuestionPage from "./pages/QuestionPage";
import FormPage from "./pages/FormPage";
import PackagePage from "./pages/PackagePage";
import SuccessPage from "./pages/SuccessPage";
import PaymentPage from "./pages/PaymentPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>

      <ScrollToTop />

      <Navbar />
      <Routes>
        <Route path="/" element={<QuestionPage />} />
        <Route path="/form/:role" element={<FormPage />} />
        <Route path="/packages/:role" element={<PackagePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>

      <Footer />
    </>
    
  );
}

export default App;