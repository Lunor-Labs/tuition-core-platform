import React, { useState } from 'react';
import './Topstudent.css';
import studentImage from '../assets/student1.png';

interface Student {
  rank: number;
  name: string;
  school: string;
  marks: number;
  image?: string;
}

const Topstudent: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('2026 A/L Physics');

  const topStudents: Student[] = [
    { rank: 1, name: 'Yasith Banula', school: 'Sri Sumangala Maha Vidyalaya', marks: 60, image: studentImage },
    { rank: 2, name: 'Yasith Banula', school: 'Sri Sumangala Maha Vidyalaya', marks: 60, image: studentImage },
    { rank: 3, name: 'Yasith Banula', school: 'Sri Sumangala Maha Vidyalaya', marks: 60, image: studentImage },
  ];

  const remainingStudents: Student[] = [
    { rank: 4, name: 'Yasith Banula', school: '', marks: 60, image: studentImage },
    { rank: 5, name: 'Yasith Banula', school: '', marks: 60 },
    { rank: 6, name: 'Yasith Banula', school: '', marks: 60 },
    { rank: 7, name: 'Yasith Banula', school: '', marks: 60 },
    { rank: 8, name: 'Yasith Banula', school: '', marks: 60 },
    { rank: 9, name: 'Yasith Banula', school: '', marks: 60 },
    { rank: 10, name: 'Yasith Banula', school: '', marks: 60 },
  ];

  const filters = ['2026 A/L Physics', '2026 A/L Physics', '2026 A/L Physics'];

  return (
    <section className="topstudent" id="top10">
      {/* Header Section */}
      <div className="topstudent-header">
        <div className="topstudent-header-container">
          <h2 className="topstudent-title">Paper Class Top 10 Student List</h2>
          <p className="topstudent-description">
            Ornare id fames interdum porttitor nulla turpis etiam. Diam vitae sollicitudin at nec nam et pharetra gravida. Adipiscing a quis ultrices eu ornare tristique vel nisl orci.
          </p>
          
          {/* Filter Buttons */}
          <div className="filter-buttons">
            {filters.map((filter, index) => (
              <button
                key={index}
                className={`filter-btn ${activeFilter === filter && index === filters.length - 1 ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Student List Section */}
      <div className="topstudent-list">
        <div className="topstudent-container">
          {/* Top 3 Students */}
          <div className="top-students">
            {topStudents.map((student) => (
              <div key={student.rank} className="top-student-card">
                <div className="rank-badge">{String(student.rank).padStart(2, '0')}</div>
                <div className="student-image-wrapper">
                  <img 
                    src={student.image || studentImage} 
                    alt={student.name}
                    className="student-profile-image"
                  />
                </div>
                <h3 className="student-name">{student.name}</h3>
                <p className="student-school">{student.school}</p>
                <p className="student-marks">Marks {student.marks}</p>
              </div>
            ))}
          </div>

          {/* Remaining Students */}
          <div className="remaining-students">
            {remainingStudents.map((student) => (
              <div key={student.rank} className="remaining-student-card">
                <div className="remaining-card-content">
                  {student.image && (
                    <div className="student-image-wrapper-small">
                      <img 
                        src={student.image} 
                        alt={student.name}
                        className="student-profile-image-small"
                      />
                    </div>
                  )}
                  <div className="remaining-card-text">
                    <h4 className="student-name-small">{student.name}</h4>
                    <p className="student-marks-small">Marks {student.marks}</p>
                    <p className="student-rank">Rank {String(student.rank).padStart(2, '0')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Topstudent;

