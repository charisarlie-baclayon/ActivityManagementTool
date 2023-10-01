import React from 'react';
import logo from '../../assets/img/logo/logo-incubatee-light-1.png';
import './Footer.Home.css';
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";

export const Footer = () => {
    return (
        <footer className="footer bg-dark text-light">
            <div className="container-md py-5">
                <div className="row">
                    <div className="footer-logo col-md-3">
                        <div className="mb-3">
                            <a className='footer-logo-link' href='/home'>
                                <img src={logo} alt='Your Logo' />
                            </a>
                        </div>
                        <div className="mb-3">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                            </p>
                        </div>
                    </div>

                    <div className="col-md-6"></div>
                    
                    <div className="footer-social col-md-3 text-md-right">
                        <p className='fw-bold'>Follow Us On:</p>
                        <div className="footer-social-media-icons justify-content-md-end">
                            <a href="#" className="me-3"><FiFacebook className="text-light" /></a>
                            <a href="#" className="me-3"><FiInstagram className="text-light" /></a>
                            <a href="#"><FiTwitter className="text-light" /></a>
                        </div>
                    </div>
                </div>
            </div>

            <hr/>

            <div className="container-md py-3">
                <div className="row">
                    <div className="col-md-6 text-md-left">
                        <p className="text-light">Copyright © 2023 | WILS Incubatee</p>
                    </div>
                    <div className="col-md-6 text-md-right">
                        <p>
                            <a className='text-light' href="#">Terms of Service</a> | <a className='footer-link text-light' href="#">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
