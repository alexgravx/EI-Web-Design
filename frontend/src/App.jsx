import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
//import Addmovie from './pages/AddMovie/Addmovie';<Route path="counter" element={<Search />} />
//import Search from './pages/Search/search';<Route path="addmovie" element={<Addmovie />} />
import Users from './pages/Users/Users';
import Navbar from './components/Navbar/Navbar';
import Movies from './pages/MovieDDB/Movies';
import Search from './pages/Search/Search';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="users" element={<Users />} />
        <Route path="movies" element={<Movies />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
