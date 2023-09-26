import React, { useEffect, useState } from 'react';
import '@styles/Home/Home.CTA.css';

export const Home_CTASection = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth', duration: 500 });
  };

  return (
    <div className="cta-section">
      <div className='container cta-content'>
        <div className='d-flex flex-column gap-3 align-items-center'>
          <h1 className='fw-bold'>What are you waiting for? <span className='text-secondary'>Join</span> Us!</h1>

          <div className='row cta-buttons'>
            <div className='col'>
              <button className='btn fw-bold text-fs-5 bw-2 btn-dark btn-block'>Get Started</button>
            </div>
            <div className='col'>
              <button className='btn fw-bold text-fs-5 bw-2 btn-outline-dark btn-block' onClick={handleScrollToTop}>Back to Top</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
