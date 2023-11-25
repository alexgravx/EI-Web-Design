import React, { useState } from 'react';
import axios from 'axios';
import './MovieTable.css';

function MoviesTable({ movies, onSuccessfulMovieDeletion }) {
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState(null);

  const deleteMovie = (movieId) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/movies/${movieId}`)
      .then(() => onSuccessfulMovieDeletion());
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const sortedMovies = movies.sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortBy === 'duration') {
      return sortOrder === 'asc' ? a.runtime - b.runtime : b.runtime - a.runtime;
    } else if (sortBy === 'vote') {
      return sortOrder === 'asc' ? a.vote_average - b.vote_average : b.vote_average - a.vote_average;
    }
    return 0;
  });

  return (
    <div>
      <table className="white-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('title')}>Titre</th>
            <th onClick={() => handleSort('date')}>Date</th>
            <th onClick={() => handleSort('vote')}>Vote</th>
            <th onClick={() => handleSort('duration')}>Durée en min</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedMovies.map((movie) => (
            <tr key={movie.original_title}>
              <td>{movie.original_title}</td>
              <td>{movie.date}</td>
              <td>{movie.vote_average}/10</td>
              <td>{movie.runtime}</td>
              <td>
                <button className="buttonDelete" onClick={() => deleteMovie(movie.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MoviesTable;
