import React, { useState, useEffect } from 'react';
import './Hero.css';
import studentImage from '../assets/student1.png';
import bgImage from '../assets/Bg.jpg';
import bg2 from '../assets/bg2.jpg';
import bg3 from '../assets/bg3.jpg';
import bg4 from '../assets/bg4.jpg';

const Hero: React.FC = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  // Array of background images - add more images to this array
  const backgroundImages = [
    bgImage,
    bg2,
    bg3,
    bg4
  ];

  // Change background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
      setFadeKey((prev) => prev + 1);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleDotClick = (index: number) => {
    setCurrentBgIndex(index);
    setFadeKey((prev) => prev + 1);
  };

  return (
    <section className="hero">
      <div 
        key={fadeKey}
        className="hero-background"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url(${backgroundImages[currentBgIndex]})`
        }}
      />
      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="highlight">PHYSICS</span> Online is now much easier
          </h1>
          <p className="hero-description">
            TOTC is an interesting platform that will teach you in more an interactive way
          </p>
          <div className="hero-buttons">
            <button className="btn-join">Join for free</button>
            <button className="btn-watch">
              <div className="play-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" fill="white" />
                  <path d="M10 8L16 12L10 16V8Z" fill="#2196F3" />
                </svg>
              </div>
              Watch how it works
            </button>
          </div>
        </div>

        {/* Right Content - Student Image & Cards */}
        <div className="hero-visual">
          {/* Student Image Placeholder */}
          <div className="student-image">
            <img 
              src={studentImage} 
              alt="Student" 
            />
          </div>

          {/* Floating Cards */}
          <div className="floating-card card-students">
            <div className="card-icon calendar-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="6" width="18" height="15" rx="2" stroke="white" strokeWidth="2"/>
                <path d="M3 10H21" stroke="white" strokeWidth="2"/>
                <path d="M8 3V7M16 3V7" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <div className="card-content">
              <div className="card-number">250k</div>
              <div className="card-text">Assisted Student</div>
            </div>
          </div>

          <div className="floating-card card-class">
            <div className="card-header">
              <div className="avatar">
                <div className="avatar-status"></div>
              </div>
              <div>
                <div className="class-title">User Experience Class</div>
                <div className="class-time">Today at 12.00 PM</div>
              </div>
            </div>
            <button className="btn-join-now">Join Now</button>
          </div>

          <div className="floating-card card-congrats">
            <div className="card-icon mail-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" strokeWidth="2"/>
                <path d="M3 8L12 13L21 8" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <div className="card-content">
              <div className="congrats-title">Congratulations</div>
              <div className="congrats-text">Your admission completed</div>
            </div>
          </div>

          <div className="floating-icon book-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="carousel-dots">
        {backgroundImages.map((_, index) => (
          <span 
            key={index}
            className={`dot ${currentBgIndex === index ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="whatsapp-float">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.825.738 5.488 2.025 7.788L0 32l8.412-2.013C10.663 31.238 13.263 32 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.5c-2.488 0-4.825-.675-6.825-1.85l-.488-.288-5.075 1.213 1.238-4.963-.313-.513A13.387 13.387 0 012.5 16C2.5 8.55 8.55 2.5 16 2.5S29.5 8.55 29.5 16 23.45 29.5 16 29.5zm7.388-10.05c-.4-.2-2.375-1.175-2.738-1.313-.363-.137-.625-.2-.888.2-.262.4-1.025 1.313-1.262 1.575-.238.263-.475.3-.875.1-.4-.2-1.688-.625-3.213-2-1.188-1.063-1.988-2.375-2.225-2.775-.238-.4-.025-.613.175-.813.175-.175.4-.45.6-.675.2-.225.263-.375.4-.625.138-.25.075-.475-.025-.675-.1-.2-.888-2.15-1.213-2.938-.325-.775-.65-.65-.888-.65-.225 0-.488-.025-.75-.025s-.688.1-1.05.5c-.363.4-1.388 1.35-1.388 3.3s1.425 3.838 1.625 4.1c.2.263 2.813 4.3 6.813 6.025.95.413 1.688.65 2.263.838.95.3 1.813.25 2.5.15.763-.113 2.375-.975 2.713-1.913.337-.937.337-1.75.237-1.913-.1-.162-.362-.262-.762-.462z"/>
        </svg>
      </a>
    </section>
  );
};

export default Hero;
