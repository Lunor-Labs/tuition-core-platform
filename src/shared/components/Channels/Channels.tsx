import React from 'react';
import './Channels.css';
import type { Channel } from '../../types';

const Channels: React.FC = () => {
  const channels: Channel[] = [
    {
      id: 1,
      year: '2027',
      subject: 'THEORY',
      link: '#'
    },
    {
      id: 2,
      year: '2027',
      subject: 'THEORY',
      link: '#'
    },
    {
      id: 3,
      year: '2027',
      subject: 'THEORY',
      link: '#'
    },
    {
      id: 4,
      year: '2027',
      subject: 'THEORY',
      link: '#'
    }
  ];

  return (
    <footer className="channels-section">
      <div className="channels-container">
        <div className="channels-header">
          <h2>Our Telegram Channels</h2>
          <p>Ornare id fames interdum porttitor nulla turpis etiam. Diam vitae sollicitudin at nec nam et pharetra gravida. Adipiscing a quis ultrices eu ornare tristique vel nisl orci.</p>
        </div>

        <div className="channels-cards">
          {channels.map((channel) => (
            <a href={channel.link} key={channel.id} className="channel-card" target="_blank" rel="noopener noreferrer">
              <div className="telegram-icon">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="30" fill="#4fd1c5"/>
                  <path d="M40.5 19.5L17.5 28.5L25.5 31.5L38.5 23.5L28.5 34.5L37.5 40.5L40.5 19.5Z" fill="white"/>
                  <path d="M25.5 31.5L27 37.5L28.5 34.5L25.5 31.5Z" fill="white"/>
                </svg>
              </div>
              <h3>{channel.year}</h3>
              <p>{channel.subject}</p>
            </a>
          ))}
        </div>

        <div className="footer-content">
          <div className="social-links">
            <a href="#" className="social-icon" aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="18" cy="6" r="1" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" fill="currentColor"/>
                <circle cx="4" cy="4" r="2" fill="currentColor"/>
              </svg>
            </a>
          </div>

          <div className="footer-links">
            <a href="#careers">Careers</a>
            <span className="separator">|</span>
            <a href="#privacy">Privacy Policy</a>
            <span className="separator">|</span>
            <a href="#terms">Terms & Conditions</a>
          </div>

          <p className="copyright">© 2025 Lunor Labs Pvt Ltd.</p>
        </div>
      </div>
    </footer>
  );
};

export default Channels;
