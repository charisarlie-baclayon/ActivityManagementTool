import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo/incubatee.png';
import './Home.css';
import { Link, animateScroll as scroll } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

const sections = ['hero-section', 'about-section', 'team-section', 'contact-section'];

export const NavBar = () => {
	const [activeSection, setActiveSection] = useState('');
	const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

	const navigate = useNavigate();

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

	const handleNavbarToggle = () => {
		setIsNavbarCollapsed(!isNavbarCollapsed);
	};

	const handleIncubator = () => {
		navigate('/teacher/signin');
	}

	const handleIncubatee = () => {
		navigate('/student/signin');
	}

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

				<div className={`collapse navbar-collapse p-3 rounded-3  ${isNavbarCollapsed ? '' : 'show'}`}>
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
							<button className='btn fw-bold bw-3 btn-outline-primary btn-block' onClick={handleIncubator}>Teacher</button>
						</li>
						<li className='nav-item d-flex align-items-md-center'>
							<button className='btn fw-bold bw-3 btn-primary btn-block' onClick={handleIncubatee}>Student</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
