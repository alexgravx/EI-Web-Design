import React, { useState } from 'react';
import './Banner.css'; // Import the CSS file for styling

const getPopularMovieBackdrop = (movies) => {
  // Créer une copie de l'array de films pour éviter de modifier l'original
  const moviesCopy = [...movies];

  // Utiliser une boucle pour trier les films par popularité décroissante
  for (let i = 0; i < moviesCopy.length - 1; i++) {
    for (let j = i + 1; j < moviesCopy.length; j++) {
      if (moviesCopy[j].popularity > moviesCopy[i].popularity) {
        // Échanger les positions des films si le film j est plus populaire que le film i
        [moviesCopy[i], moviesCopy[j]] = [moviesCopy[j], moviesCopy[i]];
      }
    }
  }

  // Obtenir les 5 premiers films de la liste triée
  const popularMovies = moviesCopy.slice(0, 5);

  // Obtenir les backdrop_path des films populaires
  const popularMovieBackdrops = popularMovies.map(
    (movie) => movie.backdrop_path
  );
  const popularMovietitle = popularMovies.map((movie) => movie.original_title);
  const popularMoviesOV = popularMovies.map((movie) => movie.overview);

  return [popularMovieBackdrops, popularMovietitle, popularMoviesOV];
};

const Banner = ({ movies }) => {
  const backdropMovies = getPopularMovieBackdrop(movies)[0];
  const titleMovies = getPopularMovieBackdrop(movies)[1];
  const OVMovies = getPopularMovieBackdrop(movies)[2];
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const goToPreviousMovie = () => {
    setCurrentMovieIndex((prevIndex) =>
      prevIndex === 0 ? backdropMovies.length - 1 : prevIndex - 1
    );
  };

  const goToNextMovie = () => {
    setCurrentMovieIndex((prevIndex) =>
      prevIndex === backdropMovies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentMovie = backdropMovies[currentMovieIndex];
  const currentMoviet = titleMovies[currentMovieIndex];
  const currentMovieOV = OVMovies[currentMovieIndex];

  return (
    <div className="banner">
      <div className="carousel">
        <button
          className="carousel-arrow left-arrow"
          onClick={goToPreviousMovie}
        >
          &lt;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/w1280${currentMovie}`}
          alt="banner"
          className="carousel-image"
        />
        <h1 className="titlemovie">
          {currentMoviet.split(' ').slice(0, 4).join(' ')}
        </h1>
        <h2 className="OVmovie">{currentMovieOV.slice(0, 100)}... </h2>
        <button className="carousel-arrow right-arrow" onClick={goToNextMovie}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Banner;
