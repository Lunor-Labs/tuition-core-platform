import React, { useState } from 'react';
import './Reviews.css';
import type { Review } from '../../../../shared/types';

const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews: Review[] = [
    {
      id: 1,
      text: 'සර් උගන්වන ඉංග්‍රීසි පාඩම්වලින් කියලා හැම විෂයක පොඩිම පොඩිම ප්‍රශ්න වුනත් අදාළව සර් නිතිතම තමයි හොඳම විදිහ',
      name: 'Yasith Banula',
      image: '/path/to/student1.jpg'
    },
    {
      id: 2,
      text: 'සර් උගන්වපු විදිහට, අභ්‍යාශයට කියලා ඉතාමොන්න කියලා පාඩම් එපා එපා මං සෙන්සුස් පුළුවන් කෙනාට දෙන්න පුළුවන් විදිහට සර්ලා තේරුම් කරදෙනව තාම කියනො',
      name: 'Yasith Banula',
      image: '/path/to/student2.jpg'
    },
    {
      id: 3,
      text: 'සර් නිසා තමයි මම අද විශයාව පෙරළවීම අතෙ සපය සර් නිතිතම පාඩම් වලින් හොඳොම සීමාව පරතෙහසත් ගොඩක් තිකිලා හොඳවුවා',
      name: 'Yasith Banula',
      image: '/path/to/student3.jpg'
    },
    {
      id: 4,
      text: 'සර් උගන්වන ඉංග්‍රීසි පාඩම්වලින් කියලා හැම විෂයක පොඩිම පොඩිම ප්‍රශ්න වුනත් අදාළව සර් නිතිතම තමයි හොඳම විදිහ',
      name: 'Yasith Banula',
      image: '/path/to/student4.jpg'
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 3 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= reviews.length - 3 ? 0 : prevIndex + 1
    );
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);

  return (
    <section className="reviews-section" id="reviews">
      <div className="reviews-container">
        <div className="reviews-header">
          <h2>Student Reviews</h2>
          <p>Ornare id fames interdum porttitor nulla turpis etiam. Diam vitae sollicitudin at nec nam et pharetra gravida. Adipiscing a quis ultrices eu ornare tristique vel nisl orci.</p>
        </div>

        <div className="reviews-carousel">
          <button className="carousel-btn prev-btn" onClick={handlePrev} aria-label="Previous review">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="reviews-cards">
            {visibleReviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="quote-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="10" y="30" fontSize="32" fill="#4fd1c5" fontWeight="bold">"</text>
                  </svg>
                </div>
                <p className="review-text">{review.text}</p>
                <div className="reviewer-info">
                  <img src={review.image} alt={review.name} className="reviewer-image" />
                  <p className="reviewer-name">{review.name}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-btn next-btn" onClick={handleNext} aria-label="Next review">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;