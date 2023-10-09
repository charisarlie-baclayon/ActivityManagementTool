import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo/logo-incubatee-primary-1.png';
import './NavBar.Home.css';
import { Link, animateScroll as scroll } from 'react-scroll';
import { SignInPopup } from '../popups/authentication/sign-in';
import { SignUpPopup } from '../popups/authentication/sign-up';

export const NavBar = () => {
    const [activeSection, setActiveSection] = useState('');
    const [showSignInPopup, setShowSignInPopup] = useState(false);
    const [showSignUpPopup, setShowSignUpPopup] = useState(false);
    const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

    const handleSetActive = (to) => {
        setActiveSection(to);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const sections = ['hero-section', 'about-section', 'team-section', 'contact-section'];
            let active = '';

            for (const sectionId of sections) {
                const section = document.getElementById(sectionId);
                if (section && section.offsetTop <= scrollY + 100) {
                    active = sectionId;
                }
            }

            setActiveSection(active);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const openSignInPopup = () => {
        setShowSignInPopup(true);
        document.body.classList.add('overlay-active');
        document.querySelector('.navbar').classList.add('overlay-active');
    };

    const openSignUpPopup = () => {
        setShowSignUpPopup(true);
        document.body.classList.add('overlay-active');
    };

    const closePopups = () => {
        setShowSignInPopup(false);
        setShowSignUpPopup(false);
        document.body.classList.remove('overlay-active');
        document.querySelector('.navbar').classList.remove('overlay-active'); 
    };

    const closePopupsAndOverlay = () => {
        closePopups();
    };

    const handleNavbarToggle = () => {
        setIsNavbarCollapsed(!isNavbarCollapsed);
    };

    return (
        <nav className={`navbar navbar-expand-md navbar-dark bg-dark justify-content-between fixed-top ${showSignInPopup ? 'overlay-active' : ''}`}>
            <div className="container">
                <div className="navbar-logo">
                    <a href='/home' className='navbar-logo-link'>
                        <img src={logo} alt='Your Logo' />
                    </a>
                </div>
    
                <button
                    className="navbar-toggler  text-fs-4"
                    type="button"
                    onClick={handleNavbarToggle}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
    
                <div className={`collapse navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`}>
                    <ul className='navbar-nav ml-auto gap-3'>
                        <li className='nav-item text-fs-4 d-flex align-items-center'>
                            <Link
                                to='hero-section'
                                smooth={true}
                                duration={250}
                                offset={-100}
                                onSetActive={handleSetActive}
                                spy={true}
                                className={`nav-link ${activeSection === 'hero-section' ? 'active' : ''}`}
                            >
                                Home
                            </Link>
                        </li>
                        <li className='nav-item text-fs-4 d-flex align-items-center'>
                            <Link
                                to='about-section'
                                smooth={true}
                                duration={250}
                                offset={-100}
                                onSetActive={handleSetActive}
                                spy={true}
                                className={`nav-link ${activeSection === 'about-section' ? 'active' : ''}`}
                            >
                                About
                            </Link>
                        </li>
                        <li className='nav-item text-fs-4 d-flex align-items-center'>
                            <Link
                                to='team-section'
                                smooth={true}
                                duration={250}
                                offset={-100}
                                onSetActive={handleSetActive}
                                spy={true}
                                className={`nav-link ${activeSection === 'team-section' ? 'active' : ''}`}
                            >
                                Team
                            </Link>
                        </li>
                        <li className='nav-item text-fs-4 d-flex align-items-center'>
                            <Link
                                to='contact-section'
                                smooth={true}
                                duration={250}
                                offset={-100}
                                onSetActive={handleSetActive}
                                spy={true}
                                className={`nav-link ${activeSection === 'contact-section' ? 'active' : ''}`}
                            >
                                Contact
                            </Link>
                        </li>
                        <li className='nav-item d-flex align-items-center'>
                            <button className='btn fw-bold text-fs-4 bw-2 btn-outline-primary btn-block' onClick={openSignInPopup}>Sign In</button>
                        </li>
                        <li className='nav-item d-flex align-items-center'>
                            <button className='btn fw-bold text-fs-4 bw-2 btn-primary btn-block' onClick={openSignUpPopup}>Sign Up</button>
                        </li>
                    </ul>
                </div>
    
                {showSignInPopup && <SignInPopup onClose={closePopupsAndOverlay} />}
                {showSignUpPopup && <SignUpPopup onClose={closePopupsAndOverlay} />}
                {(showSignInPopup || showSignUpPopup) && <div className='overlay' onClick={closePopupsAndOverlay}></div>}
            </div>
        </nav>
    );
};
