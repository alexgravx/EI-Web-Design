import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';
import insert_movies from '../utils/insert_bdd_movies.js';

const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(Movie) // récupère le repository = ensemble de méthode qui interagissent avec la table
    .find({}) // méthode find pour faire une requête, on peut selectionner avec {select: {firstName: true} filtrer avec {where: {firstName: "Timber"}}, retourne une promesse.
    .then(function (movies) {
      res.json({ movies: movies });
    })
    .catch(function (error) {
      console.error(error);
    });
});

router.post('/dump_bdd_movies', function (req, res) {
  insert_movies('./bdd_dumps_movies/');
  res.status(201);
});

router.post('/new', function (req, res) {
  const movieRepository = appDataSource.getRepository(Movie);
  const newMovie = movieRepository.create({
    original_title: req.body.name,
    popularity: null,
    date: req.body.date,
    runtime: req.body.runtime,
    adult: null,
    overview: null,
    poster_path: null,
    backdrop_path: null,
    vote_count: null,
    vote_average: null,
    genre: null,
  });

  movieRepository
    .insert(newMovie)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `Movie "${newMovie.name}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while adding the movie' });
      }
    });
});

router.delete('/:movieId', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .delete({ id: req.params.movieId })
    .then(function () {
      res.status(204).json({ message: 'Movie successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the movie' });
    });
});

export default router;
