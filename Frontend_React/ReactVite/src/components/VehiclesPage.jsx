import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import config from "../config";

const VehiclesPage = () => {
  const URL = config.API_URL;

  const [serverTime, setServerTime] = useState(new Date());
  const [activeButton, setActiveButton] = useState(0);
  const [bidAmount, setBidAmount] = useState(""); 
  const [searchQuery, setSearchQuery] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [vehicles, setVehicles] = useState([]); 
  const [vehicleDetails, setVehicleDetails] = useState(null); 
  const [highestBids, setHighestBids] = useState({}); 
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${URL}/vehicles`)  
      .then((response) => {
        setVehicles(response.data);  
        const initialBids = {};
        response.data.forEach(vehicle => {
          initialBids[vehicle.id] = vehicle.highestBid || 0; 
        });
        setHighestBids(initialBids); 
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });

    const interval = setInterval(() => {
      setServerTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchVehicleDetails = (vehicleId) => {
    axios.get(`${URL}/vehicles/${vehicleId}`) 
      .then((response) => {
        setVehicleDetails(response.data); 
        setShowDetailsModal(true); 
      })
      .catch((error) => {
        console.error("Error fetching vehicle details", error);
      });
  };

  const handleProfileClick = () => alert("Redirecting to Profile Page");

  const handleButtonClick = (index) => {
    setActiveButton(index); 
    if (index === 0) {
      setShowModal(true); 
    }
  };

  const handleAboutUsClick = () => {
    navigate('/about-us');
  };

  const handleWatchlistClick = () => {
    navigate('/watchlist');  
  };

  const handlePlaceBid = (vehicleId) => {
    if (bidAmount <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }
    
    // Check if the current bid is higher than the current highest bid
    if (bidAmount > highestBids[vehicleId]) {
      // Update the highest bid for this vehicle
      setHighestBids((prevBids) => ({
        ...prevBids,
        [vehicleId]: bidAmount
      }));

      // Send the bid to the server (this part would need to update the database in a real application)
      axios.post(`${URL}/vehicles/${vehicleId}/bid`, { bidAmount })
        .then(response => {
          alert("Bid placed successfully!");
        })
        .catch(error => {
          console.error("Error placing bid", error);
        });
    } else {
      alert("Your bid must be higher than the current highest bid.");
    }
  };

  return (
    <div className="container-fluid d-flex flex-column min-vh-100 px-4 py-3">
      {/* header */}
      <header className="d-flex justify-content-between align-items-center p-3 bg-white shadow-sm rounded w-100">
        <div className="d-flex align-items-center">
          <img src="/images/CV_AUCTION_HQ_LOGO (1).png" className="img-fluid" alt="logo" style={{ width: "180px" }} />
          <div className="ms-3">
            <p className="fw-bold mb-0 text-primary">Welcome, User1</p>
            <small className="text-muted">
              {serverTime.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit", month: "long", year: "numeric" })}
            </small>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <span className="fw-bold me-3">Server Time: <span className="badge bg-light text-dark">{serverTime.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })}</span></span>
        
          <span className="text-primary fw-bold me-3" style={{ cursor: "pointer", textDecoration: "underline" }} onClick={handleAboutUsClick}>
            About Us
          </span>
          <span className="text-primary fw-bold me-3" style={{ cursor: "pointer" }} onClick={handleProfileClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
          </span>
          <button className="btn btn-outline-danger btn-sm">Logout</button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="mt-4 text-center">
        <div className="position-relative mx-auto" style={{ maxWidth: "600px" }}>
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="🔍 Search vehicles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              borderRadius: "50px",
              padding: "12px 20px",
              background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
              border: "2px solid #0d6efd",
              fontSize: "16px",
              fontWeight: "500",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.background = "#fff")}
            onBlur={(e) => (e.target.style.background = "linear-gradient(135deg, #f8f9fa, #e9ecef)")}
          />
        </div>
      </div>

      {/* Vehicle Cards */}
      <div className="mt-4 d-flex flex-wrap">
        {vehicles.map((vehicle, index) => (
          <div key={index} className="card" style={{ width: "18rem" }}>
            <img src={vehicle.image} className="card-img-top" alt={vehicle.title} />
            <div className="card-body">
              <h6 className="card-title">
                {vehicle.title} <span className="text-primary">{vehicle.registrationNumber}</span>
              </h6>
              <hr />
              {/* Buttons */}
              <div className="d-flex flex-wrap">
                {["Gallery", "Vehicle Details", "Evaluation Report"].map((label, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`btn btn-sm me-2 mt-2 ${activeButton === index ? "btn-primary" : "btn-light"}`}
                    onClick={() => {
                      handleButtonClick(index);
                      if (index === 1) {
                        fetchVehicleDetails(vehicle.id); // Fetch details for the clicked vehicle
                      }
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {/* Highest Bid*/}
              <div className="mt-1">
                <label htmlFor="bidAmount" className="form-label">
                  Current Highest Bid: {highestBids[vehicle.id] ? highestBids[vehicle.id] : "No bids yet"}
                </label>
                <input
                  type="number"
                  id="bidAmount"
                  className="form-control"
                  placeholder="Enter your bid"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
              </div>
              {/* Checkbox for Terms and Conditions */}
              <div className="mt-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="termsAndConditions"
                    className="form-check-input"
                    checked={isAgreed}
                    onChange={() => setIsAgreed(!isAgreed)}
                  />
                  <label className="form-check-label" htmlFor="termsAndConditions">
                    I agree to the Terms and Conditions
                  </label>
                </div>
              </div>
              <div className="btn-group" role="group" aria-label="Basic outlined example">
                <button type="button" className="btn btn-warning">View Details</button>
                <button type="button" className="btn btn-primary" onClick={() => handlePlaceBid(vehicle.id)}>Place Bid</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto w-100">
        <p className="mb-0">© 2025 cvauction.tech All rights reserved in favour of CV Auction Tech Ltd.</p>
      </footer>

      {/* Modal to display vehicle details */}
      {showDetailsModal && vehicleDetails && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog" aria-labelledby="vehicleDetailsModal" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Vehicle Details</h5>
                <button type="button" className="close" onClick={() => setShowDetailsModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p><strong>Model: </strong>{vehicleDetails.model}</p>
                <p><strong>Year: </strong>{vehicleDetails.year}</p>
                <p><strong>Description: </strong>{vehicleDetails.description}</p>
                {/* You can display more fields as needed */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDetailsModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehiclesPage;
