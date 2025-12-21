import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll position
 * @param threshold - Scroll position threshold to trigger scrolled state
 * @returns boolean indicating if scrolled past threshold
 */
export const useScroll = (threshold: number = 50): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
};

