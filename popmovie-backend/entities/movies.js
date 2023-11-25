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
    popularity: { type: Number, nullable: true },
    date: { type: String },
    runtime: { type: Number },
    adult: { type: Boolean, nullable: true },
    overview: { type: String, nullable: true },
    poster_path: { type: String, nullable: true },
    backdrop_path: { type: String, nullable: true },
    vote_count: { type: Number, nullable: true },
    vote_average: { type: Number, nullable: true },
    genre: { type: String, nullable: true },
  },
});

export default Movie;
