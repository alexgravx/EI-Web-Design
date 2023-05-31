import './movie.css';

function movie({ movies }) {
  return (
    <div className="films">
      {movies.map((film) => (
        <div className="movies-posters">
          <img
            className="movie-image"
            alt="poster"
            src={`https://image.tmdb.org/t/p/w1280${film.poster_path}`}
            height="300"
            width="200"
          />
          <div className="movies-details">
            <p>{film.original_title}</p>
            <p>{film.release_date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default movie;
