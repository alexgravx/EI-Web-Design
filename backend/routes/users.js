import express from 'express';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';
import insert_users from '../utils/insert_bdd_users.js';

const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(User) // récupère le repository = ensemble de méthode qui interagissent avec la table
    .find({}) // méthode find pour faire une requête ex {where firstname : "john"}, retourne une promesse.
    .then(function (users) {
      res.json({ users: users });
    });
});

router.post('/dump_bdd_users', function (req, res) {
  insert_users('./bdd_dumps_users/');
  res.status(201);
});

router.post('/new', function (req, res) {
  const userRepository = appDataSource.getRepository(User);
  const newUser = userRepository.create({
    nickname: req.body.nickname,
    birthday: req.body.birthday,
    gender: req.body.gender,
    bio: req.body.bio,
  });

  userRepository
    .insert(newUser)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `User with email "${newUser.email}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the user' });
      }
    });
});

router.delete('/:userId', function (req, res) {
  appDataSource
    .getRepository(User)
    .delete({ id: req.params.userId })
    .then(function () {
      res.status(204).json({ message: 'User successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the user' });
    });
});

export default router;
