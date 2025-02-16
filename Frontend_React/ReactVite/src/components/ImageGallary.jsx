import React, { useState } from 'react';

const ImageGallery = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageUrls = images.split(','); 

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="gallery-modal"
      onClick={handleClose} 
      style={galleryModalStyles}
    >
      <div className="modal-content" style={modalContentStyles}>
        <h5>Gallery</h5>
        <div className="carousel-container" style={carouselContainerStyles}>
          <button
            className="carousel-button prev"
            onClick={handlePrev}
            style={carouselButtonStyles}
          >
            &#10094;
          </button>
          <img
            src={imageUrls[currentIndex]}
            alt={`Gallery Image ${currentIndex}`}
            className="gallery-image"
            style={galleryImageStyles}
          />
          <button
            className="carousel-button next"
            onClick={handleNext}
            style={carouselButtonStyles}
          >
            &#10095;
          </button>
        </div>
        <button onClick={onClose} className="btn btn-secondary" style={closeButtonStyles}>
          Close
        </button>
      </div>
    </div>
  );
};

const galleryModalStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyles = {
  position: 'relative',
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
  width: '80%',
  maxWidth: '600px',
  textAlign: 'center',
};

const carouselContainerStyles = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
};

const carouselButtonStyles = {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: '#fff',
  border: 'none',
  padding: '10px',
  fontSize: '24px',
  cursor: 'pointer',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
};

const galleryImageStyles = {
  maxWidth: '100%',
  height: 'auto',
  borderRadius: '8px',
};

const closeButtonStyles = {
  marginTop: '15px',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default ImageGallery;
