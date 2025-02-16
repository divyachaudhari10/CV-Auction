import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';

function PaymentPlans() {
  const navigate = useNavigate();

  const handleBasicPlan = () => {
    navigate("/payment-basic");
  };

  const handlePremiumPlan = () => {
    navigate("/payment-premium");
  };

  return (
    <div className="container-fluid d-flex flex-column min-vh-100 px-4 py-3"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        paddingBottom: "50px",
      }}>
      <h2 className="text-center mt-5 mb-5 fw-bold text-dark">Choose Your Plan</h2>

      <div className="row justify-content-center align-items-center" style={{ gap: "50px", height: "100%" }}>
        <div className="col-md-5">
          <div className="card shadow-lg text-center p-5 border-0 rounded-lg bg-light"
            style={{
              borderRadius: "20px",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h4 className="fw-bold text-primary">Basic Plan</h4>
            <h5 className="fw-bold text-danger">₹10,000</h5>
            <p className="text-secondary">Allows only <strong>10 Chances</strong> to bid</p>
            <hr />
            <button type="button" className="btn btn-primary btn-lg w-100"
              style={{
                borderRadius: "50px",
              }}
              onClick={handleBasicPlan}>Select Plan</button>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card shadow-lg text-center p-5 border-0 rounded-lg bg-warning"
            style={{
              borderRadius: "20px",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h4 className="fw-bold text-dark">Premium Plan</h4>
            <h5 className="fw-bold text-danger">₹20,000</h5>
            <p className="text-dark">Allows up to <strong>20 Chances</strong> to bid</p>
            <hr />
            <button type="button" className="btn btn-dark btn-lg w-100"
              style={{
                borderRadius: "50px",
              }}
              onClick={handlePremiumPlan}>Select Plan</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPlans;
