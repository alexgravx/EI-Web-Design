import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from '../../components/Movie/movie.jsx';
import './Home.css';

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
  movies = movies.slice(0, 15000);
  const [filteredMovies, setFilteredMovies] = useState([]);
  console.log(movies);

  useEffect(() => {
    const filterMovies = () => {
      const filtered = movies.filter((film) => film.adult === true);
      setFilteredMovies(filtered);
    };

    filterMovies();
  }, [movies]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="WebsiteName"> PopMovie</h1>
      </header>
      <div className="page_container">
        <Movie movies={filteredMovies} />
      </div>
    </div>
  );
}

export default Home;
