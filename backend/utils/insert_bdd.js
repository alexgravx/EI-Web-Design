import { readdir, readFile } from 'node:fs/promises';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';

function concat_genre(genre_list) {
  var string_result = '';
  for (const i in genre_list) {
    if (genre_list[i].name === 'Science Fiction') {
      string_result = string_result.concat('Science-Fiction', ' ');
    } else {
      string_result = string_result.concat(genre_list[i].name, ' ');
    }
  }

  return string_result;
}

function transform(data) {
  var json = JSON.parse(data);
  var result = [];
  for (const i in json) {
    result.push({
      original_title: json[i].original_title,
      popularity: json[i].popularity,
      date: json[i].release_date,
      runtime: json[i].runtime,
      adult: json[i].adult,
      overview: json[i].overview,
      poster_path: json[i].poster_path,
      backdrop_path: json[i].backdrop_path,
      vote_count: json[i].vote_count,
      vote_average: json[i].vote_average,
      genre: concat_genre(json[i].genres),
    });
  }

  return result;
}

async function extract(path) {
  var result = [];
  try {
    const files = await readdir(path);
    for (const file of files) {
      const filePath = new URL(
        file,
        'file:///Users/alexandregravereaux/Desktop/Fichiers/Perso/Programmation/Git/popmovie/backend/bdd_dumps/'
      );
      const contents = await readFile(filePath, { encoding: 'utf8' });
      var data_result = transform(contents);
      result = result.concat(data_result);
      console.log(result.length);
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

async function insert_movies(path) {
  var list_films = await extract(path);
  for (const i in list_films) {
    insert_movie(list_films[i]);
  }
}

export default insert_movies;
