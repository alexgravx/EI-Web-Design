import axios from 'axios';
import './MovieTable.css';

function MoviesTable({ movies, onSuccessfulMovieDeletion }) {
  const deleteMovie = (movieId) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/movies/${movieId}`)
      .then(() => onSuccessfulMovieDeletion());
  };

  return (
    <div>
      <table className="white-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Date</th>
            <th>Vote</th>
            <th>Durée en min</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.original_title}>
              <td>{movie.original_title}</td>
              <td>{movie.date}</td>
              <td>{movie.vote_average}/10</td>
              <td>{movie.runtime}</td>
              <td>
                <button onClick={() => deleteMovie(movie.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MoviesTable;
