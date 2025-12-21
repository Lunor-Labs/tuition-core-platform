import React from 'react';
import './Teacher.css';
import bg4 from '../assets/bg4.jpg';

const Teacher: React.FC = () => {
  return (
    <section className="teacher" id="teacher">
      <div className="teacher-container">
        {/* Left Column - Text Content */}
        <div className="teacher-content">
          <h2 className="teacher-title">
            <span className="title-part-1">TOTC's</span>
            <span className="title-part-2"> පිළිබඳව</span>
          </h2>
          <p className="teacher-description">
            TOTC's school management software helps traditional and online schools manage scheduling, attendance, payments and virtual classrooms all in one secure cloud-based system.
          </p>
          <a href="#learn-more" className="teacher-link">Learn more</a>
        </div>

        {/* Right Column - Image with Overlay */}
        <div className="teacher-visual">
          <div className="teacher-image-wrapper">
            {/* Decorative Shapes */}
            <div className="decorative-shape shape-blue"></div>
            <div className="decorative-shape shape-green"></div>
            
            {/* Classroom Image */}
            <div 
              className="teacher-image"
              style={{
                backgroundImage: `url(${bg4})`
              }}
            >
              {/* Play Button Overlay */}
              <div className="play-button-overlay">
                <div className="play-button">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teacher;

