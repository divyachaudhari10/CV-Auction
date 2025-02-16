import React, { useEffect, useState } from 'react';
import AdminService from '../services/AdminService'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Auction = () => {
  const [auctions, setAuctions] = useState([]); 
  const [loading, setLoading] = useState(true);

  const fetchAuctions = async () => {
    try {
      const response = await AdminService.getAllAuctions();
      console.log(response.data); 
      setAuctions(response.data); 
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching auction data:', error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchAuctions(); 
  }, []); 

  const handleStart = async (e, auctionId) => {
    const row = e.target.closest('tr'); // Get the row of the clicked button
    row.classList.add('table-success'); // Add green background to the row
    e.target.disabled = true; // Disable the "Start" button

    try {
      await AdminService.startAuction(auctionId); 
    } catch (error) {
      console.error('Error starting auction:', error);
    }
  };

  const handleDelete = async (e, auctionId) => {
    const row = e.target.closest('tr'); 
    row.remove(); 

    try {
      await AdminService.deleteAuction(auctionId); 
    } catch (error) {
      console.error('Error deleting auction:', error);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <table className="table table-bordered text-center table-hover">
        <thead className="table-primary">
          <tr>
            <th>Auction_ID</th>
            <th>Vehicle_ID</th>
            <th>Base_Price</th>
            <th>Highest_Bid</th>
            <th>Auction_Start</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {auctions.map((auction) => (
            <tr key={auction.vehicleid}>
              <td>{auction.auctionid}</td>
              <td>{auction.vehicleid}</td>
              <td>${auction.basePrice}</td>
              <td>${auction.highestBid}</td>
              <td>{new Date(auction.auctionStart).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={(e) => handleStart(e, auction.auctionId)}
                  disabled={auction.status === 'Started'}
                >
                  Start
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => handleDelete(e, auction.auctionId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Auction;
