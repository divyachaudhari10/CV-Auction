import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import UpcomingAuctionUsers from "./UpcomingAuctionUsers";
import CurrentAuctionUsers from "./CurrentAuctionUsers";
import BidTrackingPage from "./BidTrackingPage";
import axios from 'axios';
import config from "../config";

const UserAuction = () => {
  const api = config.API_URL;

  const user = JSON.parse(localStorage.getItem("user"));
  const [serverTime, setServerTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("live");
  const [liveEvents, setLiveEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [buyLeads, setBuyLeads] = useState([]);
  const [bidAmounts, setBidAmounts] = useState({});
  const [openBidModal, setOpenBidModal] = useState(false);
  const [currentBid, setCurrentBid] = useState(0);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [newBidAmount, setNewBidAmount] = useState(0);
  const navigate = useNavigate();

  const fetchEventData = async () => {
    try {
      const eventResponse = await fetch(`${api}/currentauction`);
      const eventData = await eventResponse.json();
      setLiveEvents(eventData.liveEvents || []);
      setUpcomingEvents(eventData.upcomingEvents || []);
      const auctionResponse = await fetch(`${api}/currentauction`);
      const auctionData = await auctionResponse.json();
      setBuyLeads(auctionData || []);
    } catch (error) {
      console.error("Error fetching events or auction data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    
    navigate("/"); 
    console.log("User logged out");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if(user == null){
      navigate("/");
    }
    fetchEventData();
    const interval = setInterval(() => setServerTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAboutUsClick = () => navigate('/about-us');
  const handlePlaceBid = (vehicleId, currentBid) => {
    setSelectedVehicleId(vehicleId);
    setCurrentBid(currentBid);
    setOpenBidModal(true);
  };

  const handleBidSubmit = async () => {
    if (newBidAmount < currentBid + 2000) {
      alert("Bid must be at least 2000 more than the current bid.");
      return;
    }
    try {
      await axios.post(`${api}/placeBid`, { vehicleId: selectedVehicleId, bidAmount: newBidAmount });
      alert("Bid placed successfully");
      setOpenBidModal(false);
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("There was an error placing your bid.");
    }
  };

  return (
    <div className="container-fluid d-flex flex-column min-vh-100 px-4 py-3">
      <header className="d-flex justify-content-between align-items-center p-3 bg-white shadow-sm w-100">
        <div className="d-flex align-items-center">
          <img src="/images/CV_AUCTION_HQ_LOGO (1).png" className="img-fluid" alt="logo" style={{ width: "180px" }} />
          <div className="ms-3">
            <p className="fw-bold mb-0 text-primary">Welcome, {user.ufirstName+" "+user.ulastName}</p>
            <small className="text-muted">
              {serverTime.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit", month: "long", year: "numeric" })}
            </small>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <span className="fw-bold me-3">Server Time: <span className="badge bg-light text-dark">{serverTime.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })}</span></span>
          <span className="text-primary fw-bold me-3" style={{ cursor: "pointer" }} onClick={handleAboutUsClick}><u>About Us</u></span>
          <span className="text-primary fw-bold me-3" style={{ cursor: "pointer" }}><BsPersonCircle size={25} className="me-1" /></span>
          <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="mt-3 d-flex">
        <button className={`btn me-2 ${activeTab === "live" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setActiveTab("live")}>
          LIVE EVENTS 
        </button>
        <button className={`btn me-2 ${activeTab === "upcoming" ? "btn-dark" : "btn-outline-dark"}`} onClick={() => setActiveTab("upcoming")}>
          UPCOMING EVENTS
        </button>
        <button className={`btn ${activeTab === "buyLeads" ? "btn-success" : "btn-outline-success"}`} onClick={() => setActiveTab("buyLeads")}>
          BUY LEADS
        </button>
      </div>

      <div className="mt-3">
        {activeTab === "live" && (
          <>
            <CurrentAuctionUsers />
          </>
        )}
        {activeTab === "upcoming" && (
          <>
            <UpcomingAuctionUsers />
          </>
        )}
        {activeTab === "buyLeads" && (
          <>
            <BidTrackingPage />
          </>
        )}
      </div>
      {openBidModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Place Bid</h5>
                <button type="button" className="btn-close" onClick={() => setOpenBidModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="number"
                  value={newBidAmount}
                  onChange={(e) => setNewBidAmount(Number(e.target.value))}
                  className="form-control"
                  placeholder="Enter bid amount"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setOpenBidModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleBidSubmit}>Submit Bid</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAuction;
