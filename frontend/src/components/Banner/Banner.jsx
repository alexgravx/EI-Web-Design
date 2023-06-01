import React, { useState } from 'react';
import './Banner.css'; // Import the CSS file for styling

const Banner = () => {
  const movies = [
    { title: 'Movie 1', poster_path: 'https://image.tmdb.org/t/p/w1280/5lc6nQc0VhWFYFbNv016xze8Jvy.jpg' },
    { title: 'Movie 2', poster_path: 'https://image.tmdb.org/t/p/w1280/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg' },
    { title: 'Movie 3', poster_path: 'https://image.tmdb.org/t/p/w1280/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg' },
  ];

  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const goToPreviousMovie = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
  };

  const goToNextMovie = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
  };

  const currentMovie = movies[currentMovieIndex];

  return (
    <div className="banner">
      <div className="carousel">
        <button className="carousel-arrow left-arrow" onClick={goToPreviousMovie}>
          &lt;
        </button>
        <img src={currentMovie.poster_path} alt={currentMovie.title} className="carousel-image" />
        <button className="carousel-arrow right-arrow" onClick={goToNextMovie}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Banner;
