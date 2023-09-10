import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo/incubatee-logo-0.png';
import '../navbars/home-nav-bar.css';
import { Link, animateScroll as scroll } from 'react-scroll'; // Import Link and scroll from react-scroll

export const NavBar = () => {
    const [activeSection, setActiveSection] = useState('');

    const handleSetActive = (to) => {
        setActiveSection(to);
    };

    useEffect(() => {
        const handleScroll = () => {
            // Determine the active section based on scroll position
            // You can adjust the offset to match your layout
            const scrollY = window.scrollY;
            const sections = ['hero-section', 'about-section', 'team-section', 'contact-section']; // Add section IDs here
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

    return (
        <div className='nav-bar'>
            <div className='nav-bar-content'>
                <a href='/home'>
                    <img className='logo-0' src={logo} alt='logo'/>
                </a>
                <div className='nav-bar-menu'>
                    <div className='nav-bar-link'>
                        <Link
                            to='hero-section'
                            smooth={true}
                            duration={500}
                            offset={-100}
                            onSetActive={handleSetActive}
                            spy={true}
                            activeClass={activeSection === 'hero-section' ? 'active' : ''}
                        >
                            <a className='body-large contrast'>Home</a>
                        </Link>
                        <Link
                            to='about-section'
                            smooth={true}
                            duration={500}
                            offset={-100}
                            onSetActive={handleSetActive}
                            spy={true}
                            activeClass={activeSection === 'about-section' ? 'active' : ''}
                        >
                            <a className='body-large contrast'>About</a>
                        </Link>
                        <Link
                            to='team-section'
                            smooth={true}
                            duration={500}
                            offset={-100}
                            onSetActive={handleSetActive}
                            spy={true}
                            activeClass={activeSection === 'team-section' ? 'active' : ''}
                        >
                            <a className='body-large contrast'>Team</a>
                        </Link>
                        <Link
                            to='contact-section'
                            smooth={true}
                            duration={500}
                            offset={-100}
                            onSetActive={handleSetActive}
                            spy={true}
                            activeClass={activeSection === 'contact-section' ? 'active' : ''}
                        >
                            <a className='body-large contrast'>Contact</a>
                        </Link>
                    </div>
                    <div className='nav-bar-btn'>
                        <button className='primary-outline'>Sign In</button>
                        <button className='primary-fill'>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};