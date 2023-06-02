import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import './Movie.css';

function Movie({ movies }) {
  const [currentMovie, setCurrentMovie] = useState(null);
  const [likedMovies, setLikedMovies] = useState([]);
  const [dislikedMovies, setDislikedMovies] = useState([]);

  const openPopup = (movie) => {
    setCurrentMovie(movie);
  };

  const closePopup = () => {
    setCurrentMovie(null);
  };

  const handleLike = () => {
    if (!likedMovies.includes(currentMovie)) {
      setLikedMovies([...likedMovies, currentMovie]);
    }
    console.log(likedMovies);
  };

  const handleDislike = () => {
    if (!dislikedMovies.includes(currentMovie)) {
      setDislikedMovies([...dislikedMovies, currentMovie]);
    }
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
      <div className="liked-movies">
        <h3>Films aimés :</h3>
        <ul>
          {likedMovies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
      <div className="disliked-movies">
        <h3>Films non aimés :</h3>
        <ul>
          {dislikedMovies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Movie;