import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from 'axios';
import config from '../config';

const CurrentAuctionPage = () => {
  const api = config.API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    trackBids();
  }, []);

  var user = JSON.parse(localStorage.getItem('user'));

  const [currentAuctions, setCurrentAuctions] = useState([]);
  const [auctionStatus, setAuctionStatus] = useState([]);
  const [userBidLeft, setUserBidLeft] = useState(0);
  const [userId, setUserId] = useState(4);
  const [price, setPrice] = useState(0); 
  const [name,setName] = useState("Vehicle");
  const [cn,setCn] = useState("Honda");

  const trackBids = async () => {
    let id = user.uid;
    try {
      const response = await axios.get(`${api}/utils/userbidleft/${id}`);
      setUserBidLeft(response.data); 
    } catch (error) {
      console.error("Error fetching user bid data:", error);
    }
  };


  useEffect(() => {
    fetchAuctionData();
  }, [userId]);
  
  const getName = async (auctionid) => {
    try {
      const response = await axios.get(`${api}/getVehicleByAuction/${auctionid}`);
      console.log(response);
      setCn(response.data.manufacName);
      setName(response.data.modelName);
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data); 
      } else {
        console.error("Error:", error.message); 
      }
    }
  };
  

  const fetchAuctionData = async () => {  
    try {
      const auctionResponse = await fetch(`${api}/currentauction`);
      const auctionData = await auctionResponse.json();
      setCurrentAuctions(auctionData);

      // const statusResponse = await fetch(`${api}/auction-status`);
      // const statusData = await statusResponse.json();
      // setAuctionStatus(statusData);

      const userBidResponse = await fetch(`${api}/utils/userbidleft/${userId}`);
      const userBidData = await userBidResponse.json();
      setUserBidLeft(userBidData.bidsLeft || 0);
    } catch (error) {
      console.error('Error fetching auction data:', error);
    }
  };

  const handlePlaceBid = async (auction) => {
    if (userBidLeft <= 0) {
        alert('No bids left in your account!');
        return;
    }

    const offeredBid = prompt("Enter your bid amount:");

    if (offeredBid !== null) {
        const bidAmount = parseInt(offeredBid, 10);

        if (bidAmount <= auction.highestBid + 2000) {
            alert(`Your bid must be more than ₹2000 higher than the current highest bid (₹${auction.highestBid}).`);
            return;
        }

        const dataa = {
            allowedUserUid: user.uid,
            vehicleid: auction.vehicleid,
            auctionid: auction.auctionid,
            priceOffered: bidAmount,
            userBidLeft: userBidLeft - 1,
            highestBidder: user.id,
            auctionEnd: false,
        };

        try {
            const response = await axios.post(`${api}/utils/participated  `, dataa);
            if (response.data.success) {
                alert("Bid placed successfully!");
                fetchAuctionData(); // Refresh auction data
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert("The auction data has been updated. Please refresh and try again.");
                fetchAuctionData(); // Refresh auction data
            } else {
                console.error('Error placing bid:', error);
            }
        }
    }
};
  

  return (
    <div className="container-fluid">
      <header className="d-flex justify-content-between align-items-center p-3 bg-light">
        <h4>Current Auctions</h4>
        <div>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/host-auction')}>Upcoming Auctions</button>
        </div>
      </header>

      <section>
        <h5>Your Remaining Bids: {userBidLeft}</h5>

        <table className="table table-bordered">
          <thead>
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
            {currentAuctions.map((auction) => {
              console.log(auction);

              const status = auctionStatus.find(status => status.auctionid === auction.auctionid);
              const isHighestBidder = status?.highestBidder === userId;

              return (
                <tr key={auction.auctionid}>
                  <td>{cn}</td>
                  <td>{name}</td>
                  <td>{auction.basePrice}</td>
                  <td>{auction.highestBid}</td>
                  <td>{auction.auctionStart}</td>
                  <td>{auction.auctionEnd}</td>
                  <td>
                    {isHighestBidder ? (
                      <span className="badge bg-success">Winning</span>
                    ) : (
                      <button 
                        className="btn btn-primary"
                        onClick={() => handlePlaceBid(auction)}
                      >
                        Place Bid
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}

          </tbody>
        </table>  
      </section>
    </div>
  );
};

export default CurrentAuctionPage;
