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
      <table className="movies-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.name}>
              <td>{movie.name}</td>
              <td>{movie.date}</td>
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
