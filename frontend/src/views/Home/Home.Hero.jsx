import React from 'react';
import heroImage from "@assets/img/home/hero-section-woman.png";
import "@styles/Home/Home.Hero.css";

export const Home_HeroSection = () => {
  return (
    <div className='hero-section'>
      <div className="container hero-content">
        <div className="row">
          <div className="col-md">
            <h1 className="fw-bold">
              Where Ideas <span className="text-secondary">Hatch</span>
              <br />
              <span className="text-secondary">Futures</span> Form
            </h1>

            <p className='text-fs-3'>
              Join our collaborative platform for student innovators, and embark on a journey of creativity, mentorship, and limitless possibilities.
            </p>

            <div className="row feature-cards">
              <div className="col-md mb-3">
                <div className="card border">
                  <div className="card-body">
                    <h6 className='fw-bold text-fs-3'>Create your Idea</h6>
                    <p className='text-fs-5'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      <br /><br />Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <button className="btn w-100 bw-2 fw-bold  text-fs-5 btn-outline-dark">Learn More</button>
                  </div>
                </div>
              </div>
              <div className="col-md mb-3">
                <div className="card bg-dark text-white">
                  <div className="card-body">
                    <h6 className='fw-bold text-fs-3'>Know us Better</h6>
                    <p className='text-fs-5'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      <br /><br />Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <button className="btn w-100 bw-2 fw-bold text-fs-5 btn-outline-light">Learn More</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md d-flex justify-content-center align-items-center"> {/* Use d-flex, justify-content-center, and align-items-center */}
            <div>
              <img src={heroImage} alt="hero-section-woman" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};