import React from 'react';
import { FiHome, FiBook, FiActivity, FiUsers } from 'react-icons/fi';
import logo from '../../assets/img/logo/logo-incubatee-primary-2.png';
import './Student.css';
import { useLocation, useNavigate } from 'react-router-dom';

export const Student_SideBar = () => {
	const location = useLocation();

	// Define the active route for each link
	const routes = [
		{ path: '/student/home', icon: <FiHome />, name: 'Dashboard' },
		{ path: '/student/teams', icon: <FiUsers />, name: 'Teams' },
		{ path: '/student/activities', icon: <FiActivity />, name: 'Activity' },
	];
	const navigate = useNavigate();

	// Function to determine if a route should be considered active
	const isRouteActive = (route) => {
		// Check if the current path starts with the route path
		return location.pathname.startsWith(route.path);
	};

	return (
		<aside className={`sidebar fixed-top bg-secondary`}>
			<div className="d-flex flex-column align-items-center vh-100 gap-3 mt-3">
				<div className="sidebar-logo">
					<a href='/home' className='sidebar-logo-link'>
						<img src={logo} alt='Your Logo' />
					</a>
				</div>
				<hr className="separator text-light w-75 " />

				{routes.map((route, index) => (
					<div
						key={index}
						className={`sidebar-link  d-flex gap-3 p-3 shadow align-items-center border border-primary ${isRouteActive(route) ? 'bg-primary text-dark' : 'bg-secondary text-primary'
							} w-100 `}
						onClick={() => {
							navigate(route.path);
						}}
					>
						{route.icon && <div className='ml-3'>{route.icon}</div>}
						<span className='mr-3'>{route.name}</span>
					</div>
				))}
			</div>
		</aside>
	);
};
