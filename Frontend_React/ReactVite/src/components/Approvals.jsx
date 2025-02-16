import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 
import config from '../config';

const Approvals = () => {
  
  const URL = config.API_URL;

  const [approvals, setApprovals] = useState([]);
  useEffect(() => {
    axios.get(`${URL}/Approval`)  
      .then((response) => {
        setApprovals(response.data);
      })
      .catch((error) => {
        console.error("Error fetching approval data:", error);
      });
  }, []);

  const handleApproved = (e, vehicleId) => {
    const row = e.target.closest('tr');
    row.classList.add('table-success'); 
    e.target.disabled = true; 

    axios.post(`${URL}/approval/${vehicleId}/approve`)
      .then(() => {
        console.log(`Vehicle ${vehicleId} approved`);
      })
      .catch((error) => {
        console.error(`Error approving vehicle ${vehicleId}:`, error);
      });
  };

  const handleDeny = (e, vehicleId) => {
    const row = e.target.closest('tr');
    row.remove(); 

    axios.put(`${URL}/approvals/${vehicleId}/deny`)
      .then(() => {
        console.log(`Vehicle ${vehicleId} denied`);
      })
      .catch((error) => {
        console.error(`Error denying vehicle ${vehicleId}:`, error);
      });
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Approvals</h3>

      <table className="table table-bordered text-center table-hover">
        <thead className="table-primary">
          <tr>
            <th>Vehicle_ID</th>
            <th>Event_ID</th>
            <th>Auction_ID</th>
            <th>Vehicle_Name</th>
            <th>Bid_Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through the approvals data and render rows dynamically */}
          {approvals.length > 0 ? (
            approvals.map((approval) => (
              <tr key={approval.vehicleId}>
                <td>{approval.vehicleId}</td>
                <td>{approval.eventId}</td>
                <td>{approval.auctionId}</td>
                <td>{approval.vehicleName}</td>
                <td>{approval.bidAmount}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={(e) => handleApproved(e, approval.vehicleId)}
                  >
                    Approved
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => handleDeny(e, approval.vehicleId)}
                  >
                    Deny
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No approvals available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Approvals;
