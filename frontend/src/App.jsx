import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
//import Addmovie from './pages/AddMovie/Addmovie';<Route path="counter" element={<Search />} />
//import Search from './pages/Search/search';<Route path="addmovie" element={<Addmovie />} />
import Users from './pages/Users/Users';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users" element={<Users />} />
      </Routes>
    </div>
  );
};

export default App;
