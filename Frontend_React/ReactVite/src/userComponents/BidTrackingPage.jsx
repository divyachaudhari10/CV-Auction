import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import config from "../config";

const BidTrackingPage = () => {
  const URL = config.API_URL;
  const id = JSON.parse(localStorage.getItem("user")).uid;

  const [auctions, setAuctions] = useState([]);
  const [openBidModal, setOpenBidModal] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [newBidAmount, setNewBidAmount] = useState(0);
  const [userBidLeft, setUserBidLeft] = useState(5);

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const response = await axios.get(`${URL}/AuctionStatusTrack/${id}`);
      setAuctions(response.data);
    } catch (error) {
      console.error("Error fetching auction data:", error);
    }
  };

  const openBidModalForAuction = (auction) => {
    setSelectedAuction(auction);
    setNewBidAmount(auction.priceOffered + 2000);
    setOpenBidModal(true);
  };

  const handleBidSubmit = async () => {
    if (selectedAuction) {
      if (userBidLeft <= 0) {
        alert("No bids left in your account!");
        return;
      }

      if (newBidAmount <= selectedAuction.priceOffered + 2000) {
        alert(
          `Your bid must be more than ₹2000 higher than the current highest bid (₹${selectedAuction.priceOffered}).`
        );
        return;
      }

      const bidData = {
        allowedUserUid: id,
        vehicleid: selectedAuction.vehicleid,
        auctionid: selectedAuction.auctionid,
        priceOffered: newBidAmount,
        userBidLeft: userBidLeft,
        highestBidder: id,
        auctionEnd: false,
      };

      try {
        const response = await axios.post(`${URL}/auctionstatustrack`, bidData);
        console.log("Response:", response.data);

        if (response?.data?.userBidLeft >= 0) {
          alert("Bid placed successfully!");
          setUserBidLeft(response.data.userBidLeft);
          setOpenBidModal(false);
          fetchAuctions();
        } else {
          alert("Failed to place the bid. Please try again.");
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert("The auction data has been updated. Please refresh and try again.");
          fetchAuctions();
        } else {
          console.error("Error placing bid:", error);
        }
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1>Current Auctions</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User Bid Left</th>
            <th>Price Offered</th>
            <th>Auction End</th>
            <th>Status</th>
            <th>Place Bid</th>
          </tr>
        </thead>
        <tbody>
          {auctions.map((auction) => (
            <tr key={auction.auctionid}>
              <td>{auction.userBidLeft <= 0 ? 0 : auction.userBidLeft}</td>
              <td>₹{auction.priceOffered}</td>
              <td>{auction.auctionEnd ? "Yes" : "No"}</td>
              <td
                style={{
                  color: auction.highestBidder === id ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {auction.highestBidder === id ? "Winning" : "Behind"}
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => openBidModalForAuction(auction)}
                  disabled={auction.auctionEnd || userBidLeft <= 0}
                >
                  Place Bid
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openBidModal && (
        <div className="modal show" style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Place a Bid for Vehicle ID: {selectedAuction.vehicleid}
                </h5>
                <button type="button" className="btn-close" onClick={() => setOpenBidModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="number"
                  value={newBidAmount}
                  onChange={(e) => setNewBidAmount(Number(e.target.value))}
                  className="form-control"
                  min={selectedAuction.priceOffered + 2000}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setOpenBidModal(false)}>
                  Close
                </button>
                <button className="btn btn-primary" onClick={handleBidSubmit}>
                  Submit Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidTrackingPage;
