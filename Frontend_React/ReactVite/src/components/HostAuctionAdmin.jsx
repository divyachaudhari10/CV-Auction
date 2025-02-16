import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminService from '../services/AdminService';
import axios from 'axios';
import config from '../config';

const HostAuctionAdmin = () => {
  const URL = config.API_URL;

  const [auctionEvents, setAuctionEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AdminService.getAllAuctions()
      .then((response) => {
        console.log(response.data);
        setAuctionEvents(response.data); // Store auction events in state
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error('Error fetching auction events:', error);
        setLoading(false);
      });
  }, []);

  const handleStart = (auctionId) => {
    AdminService.startAuction(auctionId) 
      .then(() => {
        const response = axios.delete(`${URL}/CurrentAuction/${auctionId}`);
        setAuctionEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.auctionid === auctionId ? { ...event, status: 'Started' } : event
          )
        );
      })
      .catch((error) => {
        console.error('Error starting auction:', error);
      });
  };

  const handleDelete = (auctionId) => {
    AdminService.deleteAuction(auctionId) 
      .then(() => {
        const response = axios.delete(`${URL}/HostAuction/${auctionId}`);
        setAuctionEvents((prevEvents) => prevEvents.filter((event) => event.auctionid !== auctionId));
      })
      .catch((error) => {
        console.error('Error deleting auction event:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <table className="table table-bordered text-center table-hover">
        <thead className="table-primary">
          <tr>
            <th>Auction ID</th>
            <th>Vehicle ID</th>
            <th>Base Price</th>
            <th>Auction Start</th>
            <th>Auction End</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {auctionEvents.map((event) => (
            <tr key={event.auctionid}> {/* Corrected property name */}
              <td>{event.auctionid}</td>
              <td>{event.vehicleid}</td> {/* Corrected property name */} {/* Corrected property name */}
              <td>{event.basePrice}</td>
              <td>{event.auctionStart}</td>
              <td>{event.auctionEnd}</td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleStart(event.auctionid)} // Corrected property name
                  disabled={event.status === 'Started'}
                >
                  {event.status === 'Started' ? 'Started' : 'Start'}
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(event.auctionid)} // Corrected property name
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

export default HostAuctionAdmin; 