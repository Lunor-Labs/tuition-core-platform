import React from 'react';
import './Hero.css';
import studentImage from '../../../../assets/web mobile.png';
/* import { useNavigate } from 'react-router-dom'; */

const Hero: React.FC = () => {
  /* const navigate = useNavigate(); */

  return (
    <section className="hero" id="home">
      {/* Floating particles */}
      <div className="floating-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <div className="hero-certificate-text">GENERAL CERTIFICATE OF EDUCATION ADVANCED LEVEL</div>
          <h1 className="hero-title-physics">
            <span className="physics-online">ONLINE PHYSICS</span>
          </h1>
          <div className="hero-instructor-name">අමිල සී.එදිරිමාන්න</div>
          <div className="hero-guarantee-english">Excellent Results are Our Guarantee</div>
          <div className="hero-guarantee-sinhala">විශිෂ්ට ප්‍රතිඵල, අපගේ සහතිකයයි...</div>
        </div>

        {/* Right visual with student image */}
        <div className="hero-visual">
          <div className="decorative-blob blob-top-left"></div>
          <div className="decorative-blob blob-bottom-right"></div>
          <div className="geometric-triangle triangle-1"></div>
          <div className="geometric-triangle triangle-2"></div>
          <div className="student-image">
            <img src={studentImage} alt="Student" />
          </div>
        </div>
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
