import React from 'react';
import './Centers.css';

interface ClassCenter {
  title: string;
  buttonText: string;
  image: string;
}

const Centers: React.FC = () => {
  const centers: ClassCenter[] = [
    {
      title: 'Riochem Institute',
      buttonText: 'Embilipitiya',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop'
    },
    {
      title: 'Nanoda Walsmulla',
      buttonText: 'Walsmulla',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop'
    },
    {
      title: 'Islandwide Online',
      buttonText: 'Live Zoom Sessions',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop'
    }
  ];

  return (
    <section className="centers" id="centers">
      {/* Header Section */}
      <div className="centers-header">
        <div className="centers-header-container">
          <h2 className="centers-title">Our Class Centers</h2>
          <p className="centers-description">
            Ornare id fames interdum porttitor nulla turpis etiam. Diam vitae sollicitudin at nec nam et pharetra gravida. Adipiscing a quis ultrices eu ornare tristique vel nisl orci.
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="centers-content">
        <div className="centers-container">
          {centers.map((center, index) => (
            <div key={index} className="center-card">
              <div 
                className="center-card-image"
                style={{ backgroundImage: `url(${center.image})` }}
              >
                <div className="center-card-overlay">
                  <h3 className="center-card-title">{center.title}</h3>
                  <button className="center-card-button">
                    {center.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Centers;

