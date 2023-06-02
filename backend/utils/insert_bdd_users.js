import { readdir, readFile } from 'node:fs/promises';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';

function transform(data) {
  var json = JSON.parse(data);
  var result = [];
  for (const i in json) {
    result.push({
      nickname: json[i].also_known_as[0],
      birthday: json[i].birthday,
      gender: json[i].gender,
      bio: json[i].biography,
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
        'file:///Users/alexandregravereaux/Desktop/Fichiers/Perso/Programmation/Git/popmovie/backend/bdd_dumps_users/'
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
  const userRepository = appDataSource.getRepository(User);
  const newUser = userRepository.create(dict);

  userRepository
    .insert(newUser)
    .then(function () {
      console.log('users importés avec succès');
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        console.log(`User "${newUser.nickname}" already exists`);
      } else {
        console.log('Error while adding the movie');
      }
    });
}

async function insert_movies(path) {
  var list_users = await extract(path);
  for (const i in list_users) {
    insert_movie(list_users[i]);
  }
}

export default insert_movies;
