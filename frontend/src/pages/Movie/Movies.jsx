import './Movies.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddMovieForm from '../../components/AddMovieForm/AddMovieForm';
import MovieTable from '../../components/MovieTable/MovieTable';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);

  const fetchMovies = () => {
    setMoviesLoadingError(null);

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/movies`)
      .then((response) => {
        setMovies(response.data.movies.slice(0, 1000));
      })
      .catch((error) => {
        setMoviesLoadingError('An error occured while fetching movies.');
        console.error(error);
      });
  };

  // fetch movies on component mount
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="Movies-container">
      <AddMovieForm onSuccessfulMovieCreation={fetchMovies} />
      <MovieTable movies={movies} onSuccessfulMovieDeletion={fetchMovies} />
      {moviesLoadingError !== null && (
        <div className="movies-loading-error">{moviesLoadingError}</div>
      )}
    </div>
  );
}

export default Movies;
