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
          {/* Mobile social icons placed as last list item so they sit inside the overlay */}
          <li className="mobile-social" aria-hidden={!isMenuOpen}>
            <div className="mobile-social-inner">
              <a href="#" aria-label="Instagram" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.2"/><path d="M7 12a5 5 0 0 1 10 0 5 5 0 0 1-10 0z" stroke="currentColor" strokeWidth="1.2"/></svg>
              </a>
              <a href="#" aria-label="Facebook" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3V2z" stroke="currentColor" strokeWidth="1.2"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 8s-.2-1.4-.8-2c-.7-.8-1.6-.8-2-0.9C16.8 5 12 5 12 5s-4.8 0-6.8.1c-.4 0-1.3 0-2 0.9C2.2 6.6 2 8 2 8S2 9.6 2 11.2v1.6C2 14.4 2.2 16 2.2 16s.2 1.4.8 2c.7.8 1.6.8 2 0.9C7.2 20 12 20 12 20s4.8 0 6.8-.1c.4 0 1.3 0 2-0.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.6C22 9.6 22 8 22 8z" stroke="currentColor" strokeWidth="1.2"/><path d="M10 14l5-2-5-2v4z" stroke="currentColor" strokeWidth="1.2"/></svg>
              </a>
              <a href="#" aria-label="TikTok" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 8v8a4 4 0 1 0 4-4V6h3" stroke="currentColor" strokeWidth="1.2"/></svg>
              </a>
              <a href="#" aria-label="Email" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8.5v7A2.5 2.5 0 0 0 5.5 18h13A2.5 2.5 0 0 0 21 15.5v-7" stroke="currentColor" strokeWidth="1.2"/><path d="M21 8l-9 6-9-6" stroke="currentColor" strokeWidth="1.2"/></svg>
              </a>
            </div>
          </li>
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
