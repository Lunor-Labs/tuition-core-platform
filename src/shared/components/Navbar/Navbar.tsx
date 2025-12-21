import React, { useState } from 'react';
import './Navbar.css';
import { useScroll } from '../../hooks';

const Navbar: React.FC = () => {
  const isScrolled = useScroll(50);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
        <ul className={`navbar-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          <li><a href="#home" onClick={closeMenu}>Home</a></li>
          <li><a href="#success" onClick={closeMenu}>Our Success</a></li>
          <li><a href="#process" onClick={closeMenu}>Our Process</a></li>
          <li><a href="#top10" onClick={closeMenu}>Top 10</a></li>
          <li><a href="#gallery" onClick={closeMenu}>Gallery</a></li>
          <li><a href="#reviews" onClick={closeMenu}>Student Reviews</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
        </ul>

        {/* Auth Buttons */}
        <div className="navbar-buttons">
          <button className="btn-login">Login</button>
          <button className="btn-signup">Sign Up</button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
