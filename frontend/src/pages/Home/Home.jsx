import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import Movie from '../../components/Movie/Movie.jsx';
import Banner from '../../components/Banner/Banner.jsx';

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

function Home() {
  // const [movieName, setMovieName] = useState(''); Pour la barre de recherche
  var movies = useFetchMovies();
  movies = movies.slice(0, 2500);
  const [filteredMovies, setFilteredMovies] = useState([]);
  console.log(movies);

  useEffect(() => {
    const filterMovies = () => {
      const filtered = movies.filter(
        (film) =>
          film.adult === false &&
          film.poster_path != null &&
          film.backdrop_path != null
      );
      setFilteredMovies(filtered);
    };

    filterMovies();
  }, [movies]);

  return (
    <div className="App">
      <header className="App-header">
        <Banner movies={filteredMovies} />
      </header>
      <div className="page_container">
        <p className="populaire">Films Populaires</p>
        <Movie movies={filteredMovies} />
      </div>
    </div>
  );
}

export default Home;
