import React, { useEffect, useState } from 'react';
import './Banner.css'; // Import the CSS file for styling

const Banner = () => {
  const images = ['https://image.tmdb.org/t/p/w1280/2hq8EKF6kaUyOxB9KhmIb5JUxEe.jpg', 'https://image.tmdb.org/t/p/w1280/jAMVKvqxdNbUY2YQWhCclYI6coP.jpg', 'https://image.tmdb.org/t/p/w1280/wbOCkfUNOnhJbWwKJIH0I4QLBkz.jpg']; 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Adjust the interval duration as per your preference

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="banner">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          className={`banner-image ${index === currentImageIndex ? 'active' : ''}`}
          alt={`Image ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default Banner;
