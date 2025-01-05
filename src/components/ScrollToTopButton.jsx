import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  // State to track the visibility of the button
  const [isVisible, setIsVisible] = useState(false);

  // Detect scroll position
  const checkScrollPosition = () => {
    if (window.scrollY > 300) {
      setIsVisible(true); // Show the button when scrolled 300px down
    } else {
      setIsVisible(false); // Hide the button when at the top
    }
  };

  // Scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll effect
    });
  };

  // Add event listener to detect scroll
  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed h-16 w-16 bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
        aria-label="Scroll to top"
      >
        <span className="text-xl">↑</span>
      </button>
    )
  );
};

export default ScrollToTopButton;
