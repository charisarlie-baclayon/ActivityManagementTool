import React, { useEffect, useState } from 'react';
import '@styles/Home/Home.CTA.css';

export const CTASection = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth', duration: 500 });
  };

  return (
    <div className="cta-section">
      <div className='container'>
        <div className='cta-section-content'>
          <h3 className='fw-bold'>What are you waiting for? <span className='text-secondary'>Join</span> Us!</h3>

          <div className='row cta-buttons'>
            <div className='col'>
              <button className='btn fw-bold bw-2 btn-primary btn-block'>Get Started</button>
            </div>
            <div className='col'>
              <button className='btn fw-bold bw-2 btn-outline-dark btn-block' onClick={handleScrollToTop}>Back to Top</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
