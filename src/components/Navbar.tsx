import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <div className="logo-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5L5 12V20C5 28.5 11.5 35.5 20 37C28.5 35.5 35 28.5 35 20V12L20 5Z" fill="currentColor"/>
              <path d="M20 10L10 15V20C10 26 14.5 31 20 32C25.5 31 30 26 30 20V15L20 10Z" fill="#1e293b"/>
            </svg>
          </div>
          <span className="logo-text">AMILA</span>
        </div>

        {/* Navigation Links */}
        <ul className="navbar-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#success">Our Success</a></li>
          <li><a href="#process">Our Process</a></li>
          <li><a href="#top10">Top 10</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#reviews">Student Reviews</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        {/* Auth Buttons */}
        <div className="navbar-buttons">
          <button className="btn-login">Login</button>
          <button className="btn-signup">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
