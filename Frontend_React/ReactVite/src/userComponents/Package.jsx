import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';

function Package() {
  const navigate = useNavigate();
  
  const handleBasicPlan = () => {
    navigate("/payment-basic");
  };
  const handlewithopoput = () => {
    navigate("/dashboard");
  }
  const handlePremiumPlan = () => {
    navigate("/payment-premium");
  };
  
  return (
    <div className="container-fluid d-flex flex-column min-vh-100 px-4 py-3">
      <header className="text-center py-4 bg-white shadow-sm border-bottom">
        <div className="container">
          <img
            src="/images/CV_AUCTION_HQ_LOGO (1).png"
            className="img-fluid"
            alt="logo"
            width="30%"
          />
        </div>
      </header>

      <h2 className="text-center mt-4 mb-4 fw-bold text-dark">Choose Your Plan</h2>

      <div className="row justify-content-center">

        <div className="col-md-5 mb-4">
          <div className="card shadow-lg text-center p-4 border-0 rounded-lg bg-light">
            <h4 className="fw-bold text-primary">Basic Plan</h4>
            <h5 className="fw-bold text-danger">₹10,000</h5>
            <p className="text-secondary">Allows only <strong>10 Chances</strong> to bid</p>
            <hr />
            <button type="button" className="btn btn-primary btn-lg w-100" onClick={handleBasicPlan}>Select Plan</button>
          </div>
        </div>

        <div className="col-md-5 mb-4">
          <div className="card shadow-lg text-center p-4 border-0 rounded-lg bg-warning">
            <h4 className="fw-bold text-dark">Premium Plan</h4>
            <h5 className="fw-bold text-danger">₹20,000</h5>
            <p className="text-dark">Allows up to <strong>20 Chance</strong> to bid</p>
            <hr />
            <button type="button" className="btn btn-dark btn-lg w-100" onClick={handlePremiumPlan}>Select Plan</button>

          </div>
        </div>
      </div>
      <div>
      <button type="button" className="btn btn-primary btn-lg w-100" onClick={handlewithopoput}>Continue without Payment</button>
      </div>

      <div className="text-center my-4">
        <a href="/about-us" className="text-primary fw-bold mx-3 text-decoration-none">About Us</a>
        <span className="text-muted">|</span>
        <a href="/about-us" className="text-primary fw-bold mx-3 text-decoration-none">Contact Us</a>
      </div>

      <footer className="bg-dark text-white text-center py-3 mt-auto w-100">
        <p className="mb-0">© 2025 cvauction.tech All rights reserved in favour of CV Auction Tech Ltd.</p>
      </footer>
    </div>
  );
}

export default Package;