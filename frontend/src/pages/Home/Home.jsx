import React, { useEffect, useState } from 'react';
import Movie from '../../components/Movie/Movie.jsx';

import './Home.css';
import Banner from '../../components/Banner/Banner.jsx';
function useFetchMovies() {
  const [movies, SetMovies] = useState([]);

  useEffect(() => {
    const url =
      'https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => SetMovies(json.results))
      .catch((err) => console.error('error:' + err));
  }, []);

  return movies;
}

function Home() {
  const [movieName, setMovieName] = useState('');
  const movies = useFetchMovies();
  const [filteredMovies, setFilteredMovies] = useState([]);
  console.log(movies);

  useEffect(() => {
    const filterMovies = () => {
      const filtered = movies.filter((film) =>
        film.title.toLowerCase().includes(movieName.toLowerCase())
      );
      setFilteredMovies(filtered);
    };

    filterMovies();
  }, [movieName, movies]);

  return (
    <div className="App">
      <header className="App-header">
        <Banner movies={filteredMovies} />
      </header>
      <div className="page_container">
        <p className='popu'>Films Populaires</p>
        <Movie movies={filteredMovies} />
      </div>
    </div>
  );
}

export default Home;
