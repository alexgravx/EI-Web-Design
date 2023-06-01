import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Users from './pages/Users/Users';
import Navbar from './components/Navbar/Navbar';
import Movies from './pages/Movie/Movies';
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
      </Routes>
    </div>
  );
}

export default App;
