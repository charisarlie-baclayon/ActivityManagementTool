import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo/logo-incubatee-primary-1.png';
import './NavBar.Home.css';
import { Link, animateScroll as scroll } from 'react-scroll';
import { SignInPopup } from '../popups/authentication/sign-in';
import { SignUpPopup } from '../popups/authentication/sign-up';

const sections = ['hero-section', 'about-section', 'team-section', 'contact-section'];

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
  };

  const openSignUpPopup = () => {
    setShowSignUpPopup(true);
    document.body.classList.add('overlay-active');
  };

  const closePopups = () => {
    setShowSignInPopup(false);
    setShowSignUpPopup(false);
    document.body.classList.remove('overlay-active');
  };

  const closePopupsAndOverlay = () => {
    closePopups();
  };

  const handleNavbarToggle = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-dark fixed-top'>
      <div className="container-md">
        <div className="navbar-logo">
          <a href='/home' className='navbar-logo-link'>
            <img src={logo} alt='Your Logo' />
          </a>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavbarToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse bg-dark p-3 rounded-3  ${isNavbarCollapsed ? '' : 'show'}`}>
          <ul className='navbar-nav ml-auto gap-3'>
            {sections.map((sectionId) => (
              <li key={sectionId} className='nav-item d-flex align-items-center'>
                <Link
                  to={sectionId}
                  smooth={true}
                  duration={250}
                  offset={-50}
                  onSetActive={handleSetActive}
                  spy={true}
                  className={`nav-link ${activeSection === sectionId ? 'active' : ''}`}
                >
                  {sectionId.charAt(0).toUpperCase() + sectionId.slice(1).replace('-section', ' ')}
                </Link>
              </li>
            ))}
            <li className='nav-item d-flex align-items-md-center'>
              <button className='btn fw-bold bw-3 btn-outline-primary btn-block' onClick={openSignInPopup}>Sign In</button>
            </li>
            <li className='nav-item d-flex align-items-md-center'>
              <button className='btn fw-bold bw-3 btn-primary btn-block' onClick={openSignUpPopup}>Sign Up</button>
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
