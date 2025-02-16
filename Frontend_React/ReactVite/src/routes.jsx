import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Directly import components
import App from "./App";
import Adashboard  from "./components/Adashboard";
import VehiclesPage from "./components/VehiclesPage";
import RegistrationForm from "./userComponents/RegistrationForm";
import AboutUs from "./userComponents/AboutUs";
import Package from "./userComponents/Package";
import PaymentComponentBasic from "./userComponents/PaymentComponentBasic";
import PaymentComponentPremium from "./userComponents/PaymentComponentPremium";
import Dashboard from "./userComponents/Dashboard";
import CustomerRatingForm from "./userComponents/CustomerRatingForm";
import UserAuction from "./userComponents/UserAuction";
import CurrentAuctionPage from "./components/CurrentAuctionPage";
import BidTrackingPage from "./userComponents/BidTrackingPage";
import ContactUs from "./userComponents/ContactUs";
import Claim from "./userComponents/Claim";
import ForgotPassword from "./userComponents/ForgotPassword";
import Image from "./userComponents/Image";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/claim" element={<Claim />} />
        <Route path="/admin-dashboard" element={<Adashboard />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/auction" element={<UserAuction />} />
        <Route path="/package" element={<Package />} />
        <Route path="/payment-basic" element={<PaymentComponentBasic />} />
        <Route path="/payment-premium" element={<PaymentComponentPremium />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer-rating" element={<CustomerRatingForm />} />
        <Route path="/current-auction" element={<CurrentAuctionPage />} />
        <Route path="/buyleads" element={<BidTrackingPage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/image" element={<Image />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
