import React, { useEffect, useState } from 'react';
import '../Home/CTASection.css';

export const CTASection = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth', duration: 500});
  };

  return (
    <div className="cta-section">
      <div className='cta-section-content'>
        <h2>Got an Idea? <span className='highlight-maroon'>Join</span> Us!</h2>
        
        <div className='cta-section-buttons'>
          <button className='secondary-fill'>
            Get Started
          </button>
          <button className='black-outline' onClick={handleScrollToTop}>
            Back to Top
          </button>
        </div>
      </div>
    </div>
  )
}