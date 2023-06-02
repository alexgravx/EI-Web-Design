import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

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
                <img
                  className="popup-image"
                  alt="poster"
                  src={`https://image.tmdb.org/t/p/w1280${currentMovie.backdrop_path}`}
                />
                <div className="detail">
                  <div className="button-container">
                    <div className="lk-buttons">
                      <button className="like-button" onClick={handleLike}>
                        <FontAwesomeIcon icon={faThumbsUp} />
                      </button>
                      <button className="dislike-button" onClick={handleDislike}>
                        <FontAwesomeIcon icon={faThumbsDown} />
                      </button>
                    </div>
                    <h1 className="titlepop">{currentMovie.original_title}</h1>
                  </div>
                  <h2 className="textvote">
                    Recommandé à {currentMovie.vote_average * 10}%
                  </h2>
                  <h2 className="textOV">{currentMovie.overview}</h2>
                </div>
                <button className="button-close" onClick={closePopup}></button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Movie;
