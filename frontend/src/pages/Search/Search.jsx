import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from '../../components/Movie/Movie.jsx';
import './Search.css';

function useFetchMovies() {
  const [movies, setMovies] = useState([]);

  const fetchUsers = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/movies`)
      .then((response) => {
        setMovies(response.data.movies);
      })
      .catch((error) => console.error(error));
  };

  // fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return movies;
}

function Search() {
  const [movieName, setMovieName] = useState('');
  var movies = useFetchMovies();
  movies = movies.slice(0, 1000);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filters, setFilters] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [resetCustomSearch, setResetCustomSearch] = useState(false);

  const resetFilters = () => {
    setSelectedFilters({});
    setFilters({});
    setFilteredMovies(movies);
  };
  useEffect(() => {
    const filterMovies = () => {
      const filtered = movies.filter((film) =>
        film.original_title.toLowerCase().includes(movieName.toLowerCase())
      );
      setFilteredMovies(filtered);
    };

    filterMovies();
  }, [movieName, movies]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => {
      if (value === null) {
        const { [filterName]: removedFilter, ...restFilters } = prevFilters;

        return restFilters;
      } else {
        return {
          ...prevFilters,
          [filterName]: value,
        };
      }
    });
  };

  const toggleCheckbox = (filterName, value) => {
    setSelectedFilters((prevFilters) => {
      const currentFilter = prevFilters[filterName] || [];
      const updatedFilter = currentFilter.includes(value)
        ? currentFilter.filter((item) => item !== value)
        : [...currentFilter, value];

      return {
        ...prevFilters,
        [filterName]: updatedFilter.length > 0 ? updatedFilter : null,
      };
    });
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = movies;

      for (const filter in filters) {
        if (filters.hasOwnProperty(filter)) {
          filtered = filtered.filter(
            (movie) => movie[filter] === filters[filter]
          );
        }
      }

      setFilteredMovies(filtered);
    };

    applyFilters();
  }, [filters, movies]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    if (!showPopup) {
      resetFilters();
    }
  };

  const handleSearch = () => {
    togglePopup();
    // Faites quelque chose avec les filtres sélectionnés ici
    // Par exemple, vous pouvez appeler une fonction pour effectuer la recherche avec les filtres personnalisés
    // searchMoviesWithCustomFilters(filters);
    setFilters(selectedFilters);
  };

  return (
    <div className="App">
      <header className="search-header"></header>
      <div className="body">
        <input
          className="input"
          value={movieName}
          placeholder="Film à chercher"
          onChange={(event) => setMovieName(event.target.value)}
        />

        {/* Bouton pour ouvrir le pop-up */}
        <div className="custom-filter">
          <button onClick={togglePopup}>Custom Search</button>
        </div>

        {/* Ouverture du popup */}
        {showPopup && (
          <div className="spopup">
            {/* Bouton pour fermer le pop-up */}
            <button className="close-button" onClick={togglePopup}>
              X
            </button>
            <div className="title-popup">
              <h1>Custom your query</h1>
            </div>
            {/* Contenu du pop-up */}
            <div className="filters">
              {/* Différentes cases à cocher */}
              <div className="column">
                <h3>Genre</h3>
                {/* Case genre - action */}
                <label>
                  <input
                    type="checkbox"
                    checked={
                      resetCustomSearch
                        ? false
                        : filters.genre && filters.genre.includes('action')
                    }
                    onChange={(e) => toggleCheckbox('genre', 'action')}
                  />
                  Action
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      resetCustomSearch
                        ? false
                        : filters.genre && filters.genre.includes('comedy')
                    }
                    onChange={(e) => toggleCheckbox('genre', 'comedy')}
                  />
                  Comedy
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      resetCustomSearch
                        ? false
                        : filters.genre && filters.genre.includes('fantasy')
                    }
                    onChange={(e) => toggleCheckbox('genre', 'fantasy')}
                  />
                  Fantasy
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      resetCustomSearch
                        ? false
                        : filters.genre &&
                          filters.genre.includes('science-fiction')
                    }
                    onChange={(e) => toggleCheckbox('genre', 'science-fiction')}
                  />
                  Science Fiction
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      resetCustomSearch
                        ? false
                        : filters.genre && filters.genre.includes('horror')
                    }
                    onChange={(e) => toggleCheckbox('genre', 'horror')}
                  />
                  Horror
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      resetCustomSearch
                        ? false
                        : filters.genre && filters.genre.includes('war')
                    }
                    onChange={(e) => toggleCheckbox('genre', 'war')}
                  />
                  War
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      resetCustomSearch
                        ? false
                        : filters.genre && filters.genre.includes('musical')
                    }
                    onChange={(e) => toggleCheckbox('genre', 'musical')}
                  />
                  Musical
                </label>
              </div>
              <div className="column">
                <h3>Aimed Public</h3>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      resetCustomSearch
                        ? false
                        : filters.public && filters.public.includes('adult')
                    }
                    onChange={(e) => toggleCheckbox('public', 'adult')}
                  />
                  Adult
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      resetCustomSearch
                        ? false
                        : filters.public && filters.public.includes('family')
                    }
                    onChange={(e) => toggleCheckbox('public', 'family')}
                  />
                  Family
                </label>
              </div>
            </div>
            {/* Bouton de recherche personnalisée */}
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
        )}

        <Movie movies={filteredMovies} />
      </div>
    </div>
  );
}

export default Search;
