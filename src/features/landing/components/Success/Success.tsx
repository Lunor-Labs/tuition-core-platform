import React from 'react';
import './Success.css';
import studentImage from '../../../../assets/student1.png';
import type { Student } from '../../../../shared/types';

const Success: React.FC = () => {
  const students: Student[] = [
    { name: 'Yasith Banula', year: '2024 A/L', district: 'Gampaha District', subject: 'Physics', grade: 'A' },
    { name: 'Yasith Banula', year: '2024 A/L', district: 'Gampaha District', subject: 'Physics', grade: 'A' },
    { name: 'Yasith Banula', year: '2024 A/L', district: 'Gampaha District', subject: 'Physics', grade: 'A' },
    { name: 'Yasith Banula', year: '2024 A/L', district: 'Gampaha District', subject: 'Physics', grade: 'A' },
    { name: 'Yasith Banula', year: '2024 A/L', district: 'Gampaha District', subject: 'Physics', grade: 'A' },
    { name: 'Yasith Banula', year: '2024 A/L', district: 'Gampaha District', subject: 'Physics', grade: 'A' },
    { name: 'Yasith Banula', year: '2024 A/L', district: 'Gampaha District', subject: 'Physics', grade: 'A' },
    { name: 'Yasith Banula', year: '2024 A/L', district: 'Gampaha District', subject: 'Physics', grade: 'A' },
  ];

  return (
    <section className="success" id="success">
      {/* Upper White Section */}
      <div className="success-header">
        <div className="success-header-container">
          <h2 className="success-title">Our Success</h2>
          <p className="success-description">
            Ornare id fames interdum porttitor nulla turpis etiam. Diam vitae sollicitudin at nec nam et pharetra gravida. Adipiscing a quis ultrices eu ornare tristique vel nisl orci.
          </p>
        </div>
      </div>

      {/* Lower Purple Section */}
      <div className="success-profiles">
        <div className="success-profiles-wrapper">
          <div className="success-profiles-container">
            {[...students, ...students].map((student, index) => (
              <div key={index} className="student-card">
                <div className="student-image-wrapper">
                  <img 
                    src={studentImage} 
                    alt={student.name}
                    className="student-profile-image"
                  />
                </div>
                <h3 className="student-name">{student.name}</h3>
                <p className="student-year">{student.year}</p>
                <p className="student-district">{student.district}</p>
                <div className="student-tag">
                  {student.subject}: {student.grade}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Success;

