import React from 'react';

const Image = () => {
  const imageUrls = [
    ["https://images-cvauction.s3.ap-south-1.amazonaws.com/IMG-20250206-WA0005.jpg", "https://images-cvauction.s3.ap-south-1.amazonaws.com/IMG-20250206-WA0003.jpg", "https://images-cvauction.s3.ap-south-1.amazonaws.com/IMG-20250206-WA0004.jpg"],
    ["https://images-cvauction.s3.ap-south-1.amazonaws.com/IMG-20250206-WA0011.jpg", "https://images-cvauction.s3.ap-south-1.amazonaws.com/IMG-20250206-WA0008.jpg", "https://images-cvauction.s3.ap-south-1.amazonaws.com/IMG-20250206-WA0007.jpg"],
    ["https://images-cvauction.s3.ap-south-1.amazonaws.com/IMG-20250206-WA0034.jpg", "https://images-cvauction.s3.ap-south-1.amazonaws.com/IMG-20250206-WA0035.jpg", "https://images-cvauction.s3.ap-south-1.amazonaws.com/IMG-20250206-WA0037.jpg"],
    ["https://images-cvauction.s3.ap-south-1.amazonaws.com/IMG-20250206-WA0063.jpg", "https://images-cvauction.s3.ap-south-1.amazonaws.com/IMG-20250206-WA0060.jpg", "https://images-cvauction.s3.ap-south-1.amazonaws.com/IMG-20250206-WA0059.jpg"]
  ];
  const styles = {
    gallery: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      padding: '20px',
      background: 'linear-gradient(135deg, #f3f3f3, #e8e8e8)',
      borderRadius: '12px'
    },
    imageItem: {
      overflow: 'hidden',
      borderRadius: '12px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease',
    },
    hoverEffect: {
      transform: 'translateY(-5px)',
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
    },
    hoverImage: {
      transform: 'scale(1.05)',
    }
  };

  return (
    <div>
      {imageUrls.map((group, groupIndex) => (
        <div key={groupIndex} style={styles.gallery}>
          {group.map((url, index) => (
            <div
              key={index}
              style={styles.imageItem}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
            >
              <img
                src={url}
                alt={`Vehicle Image ${index + 1}`}
                style={styles.image}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Image;
