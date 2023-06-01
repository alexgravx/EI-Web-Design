import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Counter from './pages/Counter/Counter';
import Users from './pages/Users/Users';
import Navbar from './components/Navbar/Navbar';
import Movies from './pages/MovieDDB/Movies';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="counter" element={<Counter />} />
        <Route path="users" element={<Users />} />
        <Route path="movies" element={<Movies />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
