import React from 'react';
import './Channels.css';
import type { Channel } from '../../types';

const Channels: React.FC = () => {
  const channels: Channel[] = [
    {
      id: 1,
      year: '2027',
      subject: 'THEORY',
      link: '#',
      image: '/src/assets/Bg.jpg',
      description: 'Complete theory coverage for A/L 2027'
    },
    {
      id: 2,
      year: '2027',
      subject: 'PHYSICS',
      link: '#',
      image: '/src/assets/bg2.jpg',
      description: 'Advanced physics concepts and problem solving'
    },
    {
      id: 3,
      year: '2027',
      subject: 'CHEMISTRY',
      link: '#',
      image: '/src/assets/bg3.jpg',
      description: 'Comprehensive chemistry lessons and labs'
    },
    {
      id: 4,
      year: '2027',
      subject: 'BIOLOGY',
      link: '#',
      image: '/src/assets/bg4.jpg',
      description: 'Biology fundamentals and practical sessions'
    }
  ];

  return (
    <section className="channels-section" id="channels">
      {/* Header Section */}
      <div className="channels-header">
        <div className="channels-header-container">
          <h2 className="channels-title">Our Telegram Channels</h2>
          <p className="channels-description">
            Ornare id fames interdum porttitor nulla turpis etiam. Diam vitae sollicitudin at nec nam et pharetra gravida. Adipiscing a quis ultrices eu ornare tristique vel nisl orci.
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="channels-content">
        <div className="channels-container">
          {channels.map((channel) => (
            <a href={channel.link} key={channel.id} className="channel-card" target="_blank" rel="noopener noreferrer">
              <div className="channel-image-wrapper">
                <img
                  src={channel.image}
                  alt={`${channel.subject} Channel`}
                  className="channel-image"
                />
                <div className="channel-overlay">
                  <div className="telegram-icon">
                    <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id={`telegram-gradient-${channel.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 1}} />
                          <stop offset="50%" style={{stopColor: '#14b8a6', stopOpacity: 1}} />
                          <stop offset="100%" style={{stopColor: '#34d399', stopOpacity: 1}} />
                        </linearGradient>
                      </defs>
                      <circle cx="30" cy="30" r="30" fill={`url(#telegram-gradient-${channel.id})`}/>
                      <path d="M40.5 19.5L17.5 28.5L25.5 31.5L38.5 23.5L28.5 34.5L37.5 40.5L40.5 19.5Z" fill="white"/>
                      <path d="M25.5 31.5L27 37.5L28.5 34.5L25.5 31.5Z" fill="white"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="channel-content">
                <h3>{channel.year} {channel.subject}</h3>
                <p className="channel-description">{channel.description}</p>
                <div className="join-channel">
                  <span>Join Channel</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer Content */}
      <footer className="footer-content">
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
        </footer>
    </section>
  );
};

export default Channels;
