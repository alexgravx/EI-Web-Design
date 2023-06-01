import React, { useState } from 'react';
import './Movie.css';

function Movie({ movies }) {
  const [currentMovie, setCurrentMovie] = useState(null);
  const openPopup = (movie) => {
    setCurrentMovie(movie);
  };

  const closePopup = () => {
    setCurrentMovie(null);
  };

  const handleLike = () => {
    // Handle like logic here
    console.log('Liked!');
  };

  const handleDislike = () => {
    // Handle dislike logic here
    console.log('Disliked!');
  };

  return (
    <div className="films">
      {movies.map((film) => (
        <div className="movies-posters" key={film.id}>
          <img
            className="movie-image"
            alt="poster"
            src={`https://image.tmdb.org/t/p/w1280${film.poster_path}`}
            height="225"
            width="150"
            onClick={() => openPopup(film)}
          />
          {currentMovie && currentMovie.id === film.id && (
            <div className={`popup ${currentMovie && 'active'}`}>
              <div className="popup-content">
                <h2>{currentMovie.title}</h2>
                <img
                  className="popup-image"
                  alt="poster"
                  src={`https://image.tmdb.org/t/p/w1280${currentMovie.poster_path}`}
                />
                <div className="popup-text">
                  <h2> Note = {currentMovie.vote_average}/10</h2>
                </div>
                <div className="button-container">
                  <button className="like-button" onClick={handleLike}>
                    Like
                  </button>
                  <button className="dislike-button" onClick={handleDislike}>
                    Dislike
                  </button>
                </div>
                <button onClick={closePopup}>Close</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Movie;
