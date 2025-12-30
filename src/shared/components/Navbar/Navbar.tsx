import React from 'react';
import './Navbar.css';
import { useScroll } from '../../hooks';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const isScrolled = useScroll(50);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    const element = document.getElementById(targetId);
    if (element) {
      // Get navbar height from CSS variable or use default
      const navbarHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <div className="logo-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5L5 12V20C5 28.5 11.5 35.5 20 37C28.5 35.5 35 28.5 35 20V12L20 5Z" fill="white" opacity="0.9"/>
              <path d="M20 10L10 15V20C10 26 14.5 31 20 32C25.5 31 30 26 30 20V15L20 10Z" fill="white"/>
            </svg>
          </div>
          <span className="logo-text">AMILA</span>
        </div>

        {/* Navigation Links */}
        <ul className="navbar-links">
          <li><a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')}>Home</a></li>
          <li><a href="#success" onClick={(e) => handleSmoothScroll(e, 'success')}>Our Success</a></li>
          <li><a href="#process" onClick={(e) => handleSmoothScroll(e, 'process')}>Our Process</a></li>
          <li><a href="#top10" onClick={(e) => handleSmoothScroll(e, 'top10')}>Top 10</a></li>
          <li><a href="#gallery" onClick={(e) => handleSmoothScroll(e, 'gallery')}>Gallery</a></li>
          <li><a href="#reviews" onClick={(e) => handleSmoothScroll(e, 'reviews')}>Student Reviews</a></li>
          <li><a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')}>Contact</a></li>
        </ul>

        {/* Auth Buttons */}
        <div className="navbar-buttons">
          <Link to="/login" className="btn-login">Login</Link>
          <Link to="/register" className="btn-signup">Sign Up</Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
