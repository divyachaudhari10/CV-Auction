import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsPersonCircle } from "react-icons/bs";
import AddVehicle from "./AddVehicle"; 
import HostAuctionAdmin from "./HostAuctionAdmin";
import AllVehicles from "./AllVehicles";
import AdminManagement from "./AdminManagement";
import Auction from "./Auction";
import Approvals from "./Approvals";
import Events from "./Events";
import AllUsers from "./AllUsers"
import { data, useNavigate } from "react-router-dom";

function Adashboard() {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [serverTime, setServerTime] = useState(new Date());
  const handleProfileClick = () => setShowProfilePopup(true);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setServerTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleHostAuctionLoad = () => {
    console.log("HostAuction is now active!"); 
  };

  const handleLogout = () => {
    localStorage.removeItem("admin"); 
    
    navigate("/"); 
    console.log("User logged out");
  };

  // Trigger handleHostAuctionLoad when HostAuction becomes the active tab
  useEffect(() => {
    if (activeTab === "HostAuction") {
      handleHostAuctionLoad();
    }
  }, [activeTab]);

  useEffect(() => {
    setActiveTab("HostAuction");  // This will trigger the HostAuction tab as soon as the page loads
  }, []);

  return (
    <div className="container-fluid d-flex flex-column min-vh-100 px-4 py-3">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center p-3 bg-white shadow-sm w-100">
        <div className="d-flex align-items-center">
          <img
            src="/images/CV_AUCTION_HQ_LOGO (1).png"
            className="img-fluid"
            alt="logo"
            style={{ width: "180px" }}
          />
          <div className="ms-3">
            <p className="fw-bold mb-0 text-primary">Welcome, Admin1</p>
            <small className="text-muted">
              {serverTime.toLocaleDateString("en-IN", {
                timeZone: "Asia/Kolkata",
                day: "2-digit",
                month: "long",
                year: "numeric"
              })}
            </small>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <span className="fw-bold me-3">Server Time: 
            <span className="badge bg-light text-dark">{serverTime.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })}</span>
          </span>
          <span
            className="text-primary fw-bold me-3"
            style={{ cursor: "pointer" }}
            onClick={handleProfileClick}
          >
            <BsPersonCircle size={25} className="me-1" />
          </span>
          <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </header><br />

      {/* Navbar */}
      <nav className="py-2">
        <div className="container d-flex flex-wrap">
          {["HostAuction", "AdminManagement", "AddVehicle", "AllVehicles", "Auction", "Approvals","Events","AllUsers"].map((item, index) => (
            <button
              key={index}
              className={`btn ${activeTab === item ? "btn-danger" : "btn-outline-secondary"} me-2 mb-2`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Dashboard Content */}
      {activeTab === "AddVehicle" && <AddVehicle />}
      {activeTab === "HostAuction" && <HostAuctionAdmin />}
      {activeTab === "AdminManagement" && <AdminManagement />}
      {activeTab === "AllVehicles" && <AllVehicles />}
      {activeTab === "Auction" && <Auction />}
      {activeTab === "Approvals" && <Approvals />}
      {activeTab === "Events" && <Events />}
      {activeTab === "AllUsers" && <AllUsers />}



      {/* Profile Popup (Right-Side Slide-in) */}
     {showProfilePopup && (
        <div
        className="position-absolute bg-white shadow-lg p-4 w-20 w-md-25"
        style={{
          top: "60px", // Position the popup just below the profile icon
          right: "10px", // Adjust the distance from the right side of the container
          zIndex: 9999,
          transition: "transform 0.3s ease-in-out",
          borderRadius: "10px",
          borderBlockEndColor:"blue"
          }}
        >
          <button
            className="btn-close position-absolute top-0 end-0"
            onClick={() => setShowProfilePopup(false)}
          ></button>
          <h4 className="text-center">User Profile</h4>
          <div className="mt-4">
            <p><strong>Name:</strong> Admin1</p>
            <p><strong>Email:</strong> admin1@cvauction.com</p>
            <p><strong>Role:</strong> Administrator</p>
            <p><strong>Status:</strong> Active</p>
            <p><strong>Last Login:</strong> {serverTime.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto w-100">
        <p className="mb-0">
          <strong>© 2025 cvauction.tech All rights reserved in favour of CV Auction Tech Ltd.</strong>
        </p>
      </footer>
    </div>
  );
}

export default Adashboard;
