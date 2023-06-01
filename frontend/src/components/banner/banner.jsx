import React, { useEffect, useState } from 'react';
import './Banner.css'; // Import the CSS file for styling

const Banner = () => {
  const images = ['https://image.tmdb.org/t/p/w1280/2hq8EKF6kaUyOxB9KhmIb5JUxEe.jpg', 'https://image.tmdb.org/t/p/w1280/7Br9F8EHrtNT2hFgD5oTfDMRgud.jpg', 'https://image.tmdb.org/t/p/w1280/jAMVKvqxdNbUY2YQWhCclYI6coP.jpg']; // Add your image paths here
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleArrowKey = (event) => {
      if (event.keyCode === 37) {
        // Left arrow key
        goToPreviousImage();
      } else if (event.keyCode === 39) {
        // Right arrow key
        goToNextImage();
      }
    };

    document.addEventListener('keydown', handleArrowKey);
    return () => {
      document.removeEventListener('keydown', handleArrowKey);
    };
  }, []);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="banner">
      <div className="arrow left-arrow" onClick={goToPreviousImage}></div>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          className={`banner-image ${index === currentImageIndex ? 'active' : ''}`}
          alt={`Image ${index + 1}`}
        />
      ))}
      <div className="arrow right-arrow" onClick={goToNextImage}></div>
    </div>
  );
};

export default Banner;
