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
        <li className="nav-item">
          <a href="/">Home</a>
        </li>
        <li className="nav-item">
          <a href="counter">Counter</a>
        </li>
        <li className="nav-item">
          <a href="users">Users</a>
        </li>
        <li className="nav-item">
          <a href="about">About</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
