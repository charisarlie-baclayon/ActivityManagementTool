import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo/incubatee-logo-contrast-0.png';
import '../footers/home-footer.css';

export const Footer = () => {
    return (
        <>
            <footer className='footer-section'>
                <div className='footer-content'>
                    <div className='footer-content-row-1'>
                        <div className='footer-company'>
                            <a href='/home'>
                                <img className='logo-contrast-0' src={logo}/>
                            </a>
                            <p className='body-small contrast'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                        </div>

                        <div className='footer-social-media'>
                            <p className='body-medium contrast'>Follow Us On:</p>
                            <div className='footer-social-media-icons'>
                                <i></i>
                                <i></i>
                            </div>
                        </div>
                    
                        
                    </div>
                    <div className='separator-contrast'/>
                    <div className='footer-content-row-2'>
                        <p className='body-medium contrast'>Copyright © 2023 | WILS Incubatee</p>
                        <p className='body-medium contrast'>Terms of Service | Privacy Policy</p>
                    </div>
                </div>
            </footer>
                <div className='footer-bar'/>
        </>
    )
}