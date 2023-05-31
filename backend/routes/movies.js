import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';

const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(Movie) // récupère le repository = ensemble de méthode qui interagissent avec la table
    .find({}) // méthode find pour faire une requête, on peut selectionner avec {select: {firstName: true} filtrer avec {where: {firstName: "Timber"}}, retourne une promesse.
    .then(function (movies) {
      res.json({ movies: movies });
    });
});

router.post('/new', function (req, res) {
  const movieRepository = appDataSource.getRepository(Movie);
  const newMovie = movieRepository.create({
    name: req.body.name,
    date: req.body.date,
  });

  movieRepository
    .insert(newMovie)
    .then(function () {
      res.status(201).json({
        message: `Le nouveau film vient d'être ajouté avec l'id ${newMovie.id}`, // newDocument reliquat, marche avec newDocument.identifiers[0].id, on utilise un format json de preference apres le .json, meme avec une string templatée
      });
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
