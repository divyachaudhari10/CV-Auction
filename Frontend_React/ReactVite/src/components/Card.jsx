import React, { useState } from 'react';
import ImageGallery from './ImageGallary';
import { data, useNavigate } from "react-router-dom";
import Image from '../userComponents/Image';


  const Card = ({
  vehicle,
  activeButtonIndices,
  onButtonClick,
  basePrice,
  onBasePriceChange,
  onAddToAuction,
  onImageClick,
}) => {
  const [selected, setSelected] = useState(false);
  const [editing, setEditing] = useState(false); 
  const [newStartDate, setNewStartDate] = useState(vehicle.startDate);
  const [newEndDate, setNewEndDate] = useState(vehicle.endDate);
  const [newBasePrice, setNewBasePrice] = useState(basePrice || vehicle.price); 
  const [showGallery, setShowGallery] = useState(false); 
  const [galleryImages, setGalleryImages] = useState([]); 

  const images = [
    'https://cvbucket099.s3.ap-south-1.amazonaws.com/IMG-20250206-WA0005.jpg', 
    'https://cvbucket099.s3.ap-south-1.amazonaws.com/IMG-20250206-WA0003.jpg', 
    'https://cvbucket099.s3.ap-south-1.amazonaws.com/IMG-20250206-WA0004.jpg'
  ];
  const navigate = useNavigate();
  
  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onBasePriceChange(vehicle.id, { target: { value: newBasePrice } });
    vehicle.startDate = newStartDate;
    vehicle.endDate = newEndDate;
    setEditing(false);
  };

  const handleCancel = () => {
    setNewStartDate(vehicle.startDate);
    setNewEndDate(vehicle.endDate);
    setNewBasePrice(basePrice || vehicle.price);
    setEditing(false);
  };

  const onDeleteVehicle = (id) => {
    console.log(id);
  };

  const openImages = () =>{
    navigate("/image", Image)
  }

  const handleGalleryClick = () => {
    setGalleryImages(images); 
    setShowGallery(true); 
  };

  return (
    <div className="col-12 col-md-4 col-lg-3 my-3">
      <div className="card shadow-lg border-0 rounded" style={{ width: '20rem', border: '2px solid #007bff', borderRadius: '12px' }}>
        <button className="btn btn-warning" onClick={openImages}>
          Gallery
        </button>

        <div className="card-body p-4">
          <h5 className="card-title fw-bold">{vehicle.modelName}</h5>
          <p className="card-text mb-1">
            <strong>Auction ID:</strong> {vehicle.regNo}
          </p>
          <div className="mb-3">
            <strong>Base Price:</strong>
            {editing ? (
              <input
                type="number"
                className="form-control mt-2"
                value={newBasePrice}
                onChange={(e) => setNewBasePrice(e.target.value)}
              />
            ) : (
              <p>{newBasePrice}&#8377;</p>
            )}
          </div>

          <div className="mb-3">
            <strong>Start Date:</strong>
            {editing ? (
              <input
                type="date"
                className="form-control mt-2"
                value={newStartDate}
                onChange={(e) => setNewStartDate(e.target.value)}
              />
            ) : (
              <p>{newStartDate}</p>
            )}
          </div>

          <div className="mb-3">
            <strong>End Date:</strong>
            {editing ? (
              <input
                type="date"
                className="form-control mt-2"
                value={newEndDate}
                onChange={(e) => setNewEndDate(e.target.value)}
              />
            ) : (
              <p>{newEndDate}</p>
            )}
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button className={`btn ${selected ? 'btn-success' : 'btn-outline-danger'}`} style={{ width: '120px' }} onClick={() => setSelected(!selected)}>
              {selected ? 'Added' : 'Add'}
            </button>

            <button className="btn btn-primary" style={{ width: '120px' }} onClick={() => onButtonClick(vehicle.id, 1)}>
              More
            </button>

            <button className="btn btn-danger" style={{ width: '120px' }} onClick={() => onDeleteVehicle(vehicle.id)}>
              Delete
            </button>

            {editing ? (
              <>
                <button className="btn btn-success" onClick={handleSave}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="btn btn-info" onClick={handleEdit}>
                Edit
              </button>
            )}
          </div>
        </div>

        {showGallery &&  navigate("/image", { state: images })}
      </div>
    </div>
  );
};

export default Card;
