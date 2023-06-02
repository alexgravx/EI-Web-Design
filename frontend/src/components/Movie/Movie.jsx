import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import AddReview from '../AddUserReview/AddUserReview';

import './Movie.css';

function Movie({ movies }) {
  const [currentMovie, setCurrentMovie] = useState(null);
  const [likedMovies, setLikedMovies] = useState([]);
  const [dislikedMovies, setDislikedMovies] = useState([]);

  const [Reviews, setReviews] = useState([]);

  const fetchReviews = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/reviews`)
      .then((response) => {
        setReviews(response.data.reviews);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // fetch movies on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

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
                    <AddReview
                      onSuccessfulReviewCreation={fetchReviews}
                      currentmovie={currentMovie}
                    />
                    <h1 className="titlepop">{currentMovie.original_title}</h1>
                  </div>
                  <h2
                    className={
                      currentMovie.vote_average * 10 > 60
                        ? 'textvote-good'
                        : 'textvote-bad'
                    }
                  >
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
