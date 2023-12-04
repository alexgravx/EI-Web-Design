import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from '../../components/Movie/Movie.jsx';
import './Search.css';

function get_genres(string_genre) {
  return string_genre.split(' ');
}

function useFetchMovies() {
  const [movies, setMovies] = useState([]);

  const fetchUsers = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/movies`)
      .then((response) => {
        setMovies(response.data.movies);
      })
      .catch((error) => console.error(error));
  };

  // fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return movies;
}

function Search() {
  const [movieName, setMovieName] = useState('');
  var movies = useFetchMovies();
  movies = movies.slice(1100, 1900);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const filterMovies = () => {
      const filtered = movies.filter(
        (film) =>
          film.original_title.toLowerCase().includes(movieName.toLowerCase()) &&
          film.poster_path != null &&
          film.backdrop_path != null
      );
      setFilteredMovies(filtered);
    };

    filterMovies();
  }, [movieName, movies]);

  return (
    <div className="App">
      <header className="search-header"></header>
      <div className="body">
        <input
          className="input"
          value={movieName}
          placeholder="Film à chercher"
          onChange={(event) => setMovieName(event.target.value)}
        />
        <Movie movies={filteredMovies} />
      </div>
    </div>
  );
}

export default Search;
