import { readdir, readFile } from 'node:fs/promises';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';

function transform(data) {
  var json = JSON.parse(data);
  var result = [];
  json.map((film) =>
    result.push({
      original_title: film.original_title,
      popularity: film.popularity,
      date: film.date,
      runtime: film.runtime,
      adult: film.adult,
      overview: film.overview,
      poster_path: film.poster_path,
      vote_count: film.vote_count,
      vote_average: film.overview,
    })
  );

  return result;
}

async function extract(path) {
  var result = [];
  try {
    const files = await readdir(path);
    for (const file of files) {
      const filePath = new URL(file, import.meta.url);
      const contents = await readFile(filePath, { encoding: 'utf8' });
      var data_result = transform(contents);
      result.concat(data_result);
    }
  } catch (err) {
    console.error(err);
  }

  return result;
}

function insert_movie(dict) {
  const movieRepository = appDataSource.getRepository(Movie);
  const newMovie = movieRepository.create(dict);

  movieRepository
    .insert(newMovie)
    .then(function () {
      console.log('films importés avec succès');
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        console.log(`Movie "${newMovie.name}" already exists`);
      } else {
        console.log('Error while adding the movie');
      }
    });
}

function insert_movies(path) {
  var list_films = extract(path);
  for (const i in list_films) {
    insert_movie(list_films[i]);
  }
}

export default insert_movies;
