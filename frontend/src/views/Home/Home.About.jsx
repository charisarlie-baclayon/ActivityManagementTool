import React from 'react';
import about_image from '@assets/img/home/about-section-man.png';
import '@styles/Home/Home.About.css';

export const AboutSection = () => {
    return (
        <div className="about-section">
            <div className='container'>
                <div className="row">
                    <div className="col-md">
                        <div>
                            <img src={about_image} alt="About" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-md">
                        <div className='about-section-texts'>
                            <h3 className='text-light fw-bold '>Why <span className='text-primary'>Incubate</span> Your Ideas?</h3>
                            <p className='text-light text-fs-3'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea c ommodo consequat. 
                                <br/><br/>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                <br/><br/>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea c ommodo consequat. 
                                <br/><br/>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}