import React, { useState } from 'react';
import './movie.css';

function Movie({ movies }) {
  const [currentMovie, setCurrentMovie] = useState(null);

  const openPopup = (movie) => {
    setCurrentMovie(movie);
  };

  const closePopup = () => {
    setCurrentMovie(null);
  };

  return (
    <div className="films">
      {movies.map((film) => (
        <div className="movies-posters" key={film.id}>
          <img
            className="movie-image"
            alt="poster"
            src={`https://image.tmdb.org/t/p/w1280${film.poster_path}`}
            height="150"
            width="100"
            onClick={() => openPopup(film)}
          />
        </div>
      ))}
      {currentMovie && (
        <div className="popup">
          <div className="popup-content">
            <h2>{currentMovie.title}</h2>
            <img
              className="popup-image"
              alt="poster"
              src={`https://image.tmdb.org/t/p/w1280${currentMovie.poster_path}`}
            />
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Movie;
