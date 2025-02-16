import React, { useState } from 'react';
import Auction from './Auction';  
import HostAuction from '../userComponents/UpcomingAuctionUsers';  

const Event = () => {
  const [showAuction, setShowAuction] = useState(false);
  const [showHostAuction, setShowHostAuction] = useState(false);

  const handleShowAuction = () => {
    setShowAuction(true);
    setShowHostAuction(false);
  };

  const handleShowHostAuction = () => {
    setShowAuction(false); 
    setShowHostAuction(true);
  };

  return (
    <div className="container mt-5">
      <div className="mb-4 text-center">
        <button className="btn btn-primary btn-lg mx-2" onClick={handleShowAuction}>
          Live Events
        </button>
        <button className="btn btn-secondary btn-lg mx-2" onClick={handleShowHostAuction}>
          Upcoming Events
        </button>
      </div>

      {showAuction && (
        <div>
          <h3 className="text-center mb-4">Auction Events</h3>
          <Auction /> 
        </div>
      )}

      {showHostAuction && (
        <div>
          <h3 className="text-center mb-4">Host Auction Events</h3>
          <HostAuction /> 
        </div>
      )}
    </div>
  );
};

export default Event;
