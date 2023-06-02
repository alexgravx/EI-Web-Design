# PopMovie Project

<img src="./Logo.png" width="120">

## 📖 Description

Application web de recommendations personnalisée de films. Présentation des films populaires et de films mis en avant avec description simple et efficace comprenant la note moyenne reçue par le film. Possibilité de chercher un film particulier selon le nom ou d'autres critères. Ajout de film ou d'utilisateur pour l'admin.

Personalized film recommendation web application. Presentation of popular films and featured films with a simple and effective description, including the average rating received by the film. Ability to search for a specific film by name or other criteria. Addition of films or users for the admin.

## 📦 Dependencies

First of all, you can install dependencies with:

```
npm install
npm install typeorm
npm install
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
```

## 📥 Installation

Le dépôt est codé en Python 3.10.7
L'installation doit être faite selon l'arborescence suivante:

```

.
├── README.md
├── package-lock.json
├── package.json
├── frontend
│   ├── index.html
│   ├── public
│   │   └── vite.svg
│   ├── vite.config.js
│   ├── node_modules  [296 entries exceeds filelimit, not opening dir]
│   ├── package.json
│   ├── package-lock.json
│   └── src
│       ├── index.jsx
│       ├── index.css
│       ├── App.jsx
│       ├── pages
│       │   ├── MovieAdd
│       │   │   ├── MovieAdd.css
│       │   │   └── MovieAdd.jsx
│       │   ├── Search
│       │   │   ├── searchicon.png
│       │   │   ├── Search.css
│       │   │   └── Search.jsx
│       │   ├── Home
│       │   │   ├── searchicon.png
│       │   │   ├── Home.css
│       │   │   ├── Home.jsx
│       │   │   └── favicon.ico
│       │   └── User
│       │       ├── User.css
│       │       └── User.jsx
│       └── components
│           ├── Header
│           │   ├── Header.css
│           │   └── Header.jsx
│           ├── MovieTable
│           │   ├── MovieTable.css
│           │   └── MovieTable.jsx
│           ├── UsersTable
│           │   ├── UsersTable.jsx
│           │   └── UsersTable.css
│           ├── AddMovieForm
│           │   ├── AddMovieForm.css
│           │   └── AddMovieForm.jsx
│           ├── Banner
│           │   ├── Banner.css
│           │   └── Banner.jsx
│           ├── Movie
│           │   ├── Movie.css
│           │   └── Movie.jsx
│           ├── Navbar
│           │   ├── thumbnail_IMG-0400.png
│           │   ├── Navbar.css
│           │   └── Navbar.jsx
│           └── AddUserReview
│               └── AddUserReview.jsx
└── backend
    ├── datasource.js
    ├── package.json
    ├── postmigration.sh
    ├── services
    │   ├── jsonErrorHandler.js
    │   └── routeNotFoundJsonHandler.js
    ├── node_modules  [344 entries exceeds filelimit, not opening dir]
    ├── package-lock.json
    ├── entities
    │   ├── movies.js
    │   ├── user.js
    │   └── reviews.js
    ├── bdd_dumps_movies  [87 entries exceeds filelimit, not opening dir]
    ├── bdd_dumps_users  [46 entries exceeds filelimit, not opening dir]
    ├── utils
    │   ├── insert_bdd_movies.js
    │   └── insert_bdd_users.js
    ├── migrations
    │   ├── 1685653294347-MigrationSimplificationTables.js
    │   ├── 1685701134393-ModifReviewColumnsNames.js
    │   └── 1685701214485-ModifReviewColumnsNames.js
    ├── database.sqlite3
    ├── routes
    │   ├── index.js
    │   ├── movies.js
    │   ├── users.js
    │   └── review.js
    └── server.js

```

## Support

Pas de support pour l'instant

## 🛣️ Roadmap

1. Récupération des films à l'aide d'une api tmdb
2. Création de la base de données et du backend
3. Création du frontend avec les différentes pages et fonctionnalités
4. Création des algorithmes de recherche et de recommendation

## Contributing

Ce projet est ouvert à contribution. Les idées sont bienvenues

Cependant, toute personne voulant apporter une fonctionnalité ou une amélioration doit d'abord contacter un membre de l'équipe initiale.

## Authors and acknowledgment

Hugues du Moulinet d'Hardemare: Maintainer  
Paul-Aimery Préveraud de Vaumas: Maintainer  
Alexandre Gravereaux: Owner

## License

License Creative Commons CC-BY-NC-ND-SA

## Project status

Projet en cours de développement
