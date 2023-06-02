import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo1 from './thumbnail_IMG-0400.png';

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
          <img alt="logonav" src={logo1} height="40px" width="40px"></img>
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
          <a href="movies">Movies</a>
        </li>
        <li className="user">
          <a href="user">User</a>
           <img alt="logouser" src='https://www.logolynx.com/images/logolynx/4b/4beebce89d681837ba2f4105ce43afac.png' height="40px" width="40px"></img>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
