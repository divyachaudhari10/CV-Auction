import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Card from "./Card";
import config from "../config";

const AllVehicles = () => {

  const URL = config.API_URL;
  
  const [vehicles, setVehicles] = useState([]);
  const [activeButtonIndices, setActiveButtonIndices] = useState({});
  const [basePrices, setBasePrices] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [searchQuery,setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get(`${URL}/vehicles`)
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicles data:", error);
      });
  }, []);

  const handleButtonClick = (vehicleId, index) => {
    setActiveButtonIndices((prevState) => ({
      ...prevState,
      [vehicleId]: index,
    }));

    if (index === 1) {
      const selectedVehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
      setVehicleDetails(selectedVehicle);
      setShowDetailsModal(true);
    }
    if (index === 0) {
      setShowModal(true);
    }
  };

  const handleBidChange = (vehicleId, e) => {
    setBasePrices((prevState) => ({
      ...prevState,
      [vehicleId]: e.target.value,
    }));
  };

  const handleAddToAuction = (vehicleId) => {
    const vehicleToAuction = vehicles.find((vehicle) => vehicle.id === vehicleId);
    const basePrice = basePrices[vehicleId];

    if (vehicleToAuction && basePrice) {
      const auctionData = { vehicleId: vehicleToAuction.id, basePrice: basePrice };

      axios
        .post(`${URL}/HostAuction`, auctionData)
        .then(() => alert(`Vehicle with ID ${vehicleId} added to auction`))
        .catch(() => alert("Error adding the vehicle to the auction"));
    } else {
      alert("Please provide a Base Price.");
    }
  };

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      (vehicle.modelName && vehicle.modelName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (vehicle.regNo && vehicle.regNo.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container-fluid d-flex flex-column min-vh-100 px-4 py-3">
      <div className="mt-4 row">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <Card
              key={vehicle.id}
              vehicle={vehicle}
              activeButtonIndices={activeButtonIndices}
              onButtonClick={handleButtonClick}
              basePrice={basePrices[vehicle.id]}
              onBasePriceChange={handleBidChange}
              onAddToAuction={handleAddToAuction}
              onImageClick={() => setShowModal(true)} 
            />
          ))
        ) : (
          <p>No vehicles found.</p>
        )}
      </div>
    </div>
  );
};

export default AllVehicles;
