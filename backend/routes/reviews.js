import express from 'express';
import { appDataSource } from '../datasource.js';
import Review from '../entities/reviews.js';

const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(Review) // récupère le repository = ensemble de méthode qui interagissent avec la table
    .find({}) // méthode find pour faire une requête, on peut selectionner avec {select: {firstName: true} filtrer avec {where: {firstName: "Timber"}}, retourne une promesse.
    .then(function (movies) {
      res.json({ movies: movies });
    });
});

router.post('/new', function (req, res) {
  const reviewRepository = appDataSource.getRepository(Review);
  const newReview = reviewRepository.create({
    user_id: req.body.user_id,
    rating: req.body.rating,
    movie_title: req.body.movie_title,
    movie_id: req.body.movie_id,
  });
  console.log(newReview);

  reviewRepository
    .insert(newReview)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `Movie "${newReview.name}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while adding the movie' });
      }
    });
});

router.delete('/:movieId', function (req, res) {
  appDataSource
    .getRepository(Review)
    .delete({ id: req.params.movieId })
    .then(function () {
      res.status(204).json({ message: 'Movie successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the movie' });
    });
});

export default router;
