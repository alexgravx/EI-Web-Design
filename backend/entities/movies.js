import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    original_title: {
      type: String,
      unique: true,
    },
    popularity: { type: Number },
    date: { type: String },
    runtime: { type: Number },
    adult: { type: Boolean },
    overview: { type: String },
    poster_path: { type: String },
    vote_count: { type: Number },
    vote_average: { type: Number },
  },
  relations: {
    genres: {
      type: 'many-to-many',
      target: 'Genre',
    },
  },
});

export default Movie;
