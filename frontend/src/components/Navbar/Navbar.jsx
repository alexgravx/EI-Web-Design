import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [navbarTransparent, setNavbarTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setNavbarTransparent(!isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${navbarTransparent ? 'transparent' : ''}`}>
      <ul className="nav-list">
        <li className="logoNav">
          <img src='https://st2.depositphotos.com/4819429/9866/v/950/depositphotos_98663476-stock-illustration-popcorn-movie-logo-design-popcorn.jpg'
          height="40px"
          width="40px" >
          </img>
        </li>
        <li className="nav-item-Popmovie">
          <p>PopMovie</p>
        </li>
        <li className="nav-item">
          <a href="/">Home</a>
        </li>
        <li className="nav-item">
          <a href="search">Search</a>
        </li>
        <li className="nav-item">
          <a href="users">Users</a>
        </li>
        <li className="nav-item">
          <a href="movies">Movies</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
