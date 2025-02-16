import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import config from "../config";

const CurrentAuctionUsers = () => {
  const api = config.API_URL;
  const api2 = api.slice(0,-3) + "aid";
  

  const [currentAuctions, setCurrentAuctions] = useState([]);
  const [userBidLeft, setUserBidLeft] = useState(0);
  const [userId, setUserId] = useState(4);
  const [auctionId, setAuctionId] = useState();

  useEffect(() => {
    trackBids();
    fetchAuctionData();
  }, [userId]);

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?.uid;

  const trackBids = async () => {
    try {
      const response = await axios.get(`${api}/utils/userbidleft/${id}`);
      setUserBidLeft(response.data);
    } catch (error) {
      console.error("Error fetching user bid data:", error);
    }
  };

  const getVehicle = async (auctionId) => {
    try {
      return await axios.get(`${api2}/${auctionId}`);
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      return null;
    }
  };

  const fetchAuctionData = async () => {
    try {
      const auctionResponse = await axios.get(`${api}/userliveauction/${id}`);
      if (auctionResponse.data) {
        setCurrentAuctions(auctionResponse.data);
      } else {
        setCurrentAuctions([]);
      }
    } catch (error) {
      console.error("Error fetching auction data:", error);
    }
  };

  const handlePlaceBid = async (auction) => {
    if (userBidLeft <= 0) {
      alert("No bids left in your account!");
      return;
    }

    const offeredBid = prompt(
      `Enter your bid amount : current highest bid ₹${auction.highestBid || 0}`
    );
    if (offeredBid !== null) {
      const bidAmount = parseInt(offeredBid, 10);

      if (isNaN(bidAmount) || bidAmount <= (auction.highestBid || 0) + 2000) {
        alert(
          `Your bid must be more than ₹2000 higher than the current highest bid (₹${
            auction.highestBid || 0
          }).`
        );
        return;
      }

      try {
        setAuctionId(auction.auctionId);
        const vehicleResponse = await getVehicle(auction.auctionId);
        const vehicle = vehicleResponse?.data;

        if (!vehicle) {
          alert("Vehicle data could not be fetched.");
          return;
        }

        const data = {
          allowedUserUid: user.uid,
          vehicleid: vehicle.vehicleid,
          auctionid: auction.auctionId,
          priceOffered: bidAmount,
          userBidLeft: 9,
          highestBidder: user.uid,
          auctionEnd: false,
        };

        const response = await axios.post(`${api}/Utils/placeBid`, data);
        if (response.status === 200) {
          alert("Bid placed successfully!");
          fetchAuctionData();
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert("The auction data has changed. Please refresh and try again.");
          await fetchAuctionData();
        } else {
          console.error("Error placing bid:", error);
        }
      }
    }
  };

  return (
    <div className="container mt-4">
      <h4>Live Auctions</h4>
      <h5>Your Remaining Bids: {userBidLeft}</h5>

      {currentAuctions.length > 0 ? (
        <table className="table table-bordered mt-3">
          <thead className="thead-dark">
            <tr>
              <th>Vehicle Brand</th>
              <th>Model</th>
              <th>Base Price</th>
              <th>Highest Bid</th>
              <th>Auction Start</th>
              <th>Auction End</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentAuctions.map((auction, index) => (
              <tr key={index}>
                <td>{auction?.brandName || "N/A"}</td>
                <td>{auction?.modelName || "N/A"}</td>
                <td>₹{auction?.basePrice || 0}</td>
                <td>₹{auction?.highestBid || 0}</td>
                <td>{auction?.auctionStart || "N/A"}</td>
                <td>{auction?.auctionEnd}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handlePlaceBid(auction);
                      setAuctionId(auction.auctionId);
                    }}
                  >
                    Place Bid
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No auctions available.</p>
      )}
    </div>
  );
};

export default CurrentAuctionUsers;
