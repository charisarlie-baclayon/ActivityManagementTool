import React from 'react';
import logo from '../../assets/img/logo/incubatee-logo-contrast-0.png';
import './Footer.Home.css';
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";

export const Footer = () => {
    return (
        <footer className="footer bg-dark text-light">
            <div className="container py-5">
                <div className="row">
                    <div className="footer-logo col-md">
                        <div className="mb-3">
                            <a className='logo' href='/home'>
                                <img src={logo} alt='Your Logo' />
                            </a>
                        </div>
                        <div className="mb-3">
                            <p className="text-fs-3">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    </div>

                    <div className="footer-space col-md"></div>
                    
                    <div className="footer-social col-md text-md-right">
                        <p>Follow Us On:</p>
                        <div className="footer-social-media-icons justify-content-md-end">
                            <a href="#" className="me-3"><FiFacebook className="text-light" /></a>
                            <a href="#" className="me-3"><FiInstagram className="text-light" /></a>
                            <a href="#"><FiTwitter className="text-light" /></a>
                        </div>
                    </div>
                </div>
            </div>

            <hr className='separator' />

            <div className="container py-3">
                <div className="row">
                    <div className="footer-copyright col-md-6 text-md-left">
                        <p className="text-fs-3 text-light">Copyright © 2023 | WILS Incubatee</p>
                    </div>
                    <div className="footer-links col-md-6 text-md-right">
                        <p className="text-fs-3">
                            <a className=' text-light' href="#">Terms of Service</a> | <a className=' text-light' href="#">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};