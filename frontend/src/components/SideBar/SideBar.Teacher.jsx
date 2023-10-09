import React, { useState } from 'react';
import { FiHome, FiBook, FiActivity } from 'react-icons/fi';
import logo from '../../assets/img/logo/logo-incubatee-primary-2.png';
import './SideBar.Student.css';
import { Link, useLocation } from 'react-router-dom';

export const SideBar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Define the active route for each link
  const routes = [
    { path: '/teacher/home', icon: <FiHome />, name: 'Dashboard' },
    { path: '/teacher/classes', icon: <FiBook />, name: 'Class' },
    { path: '/teacher/activities', icon: <FiActivity />, name: 'Activity' },
  ];

  return (
    <div className={`sidebar fixed-top bg-dark shadow-lg ${isSidebarCollapsed ? 'collapsed' : ''}`}>
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
            className={`sidebar-link d-flex gap-3 p-3 align-items-center ${
              location.pathname === route.path ? 'bg-secondary text-decoration-underline' : 'bg-dark'
            } w-100 text-light`}
          >
            {route.icon && <div className='ml-3'>{route.icon}</div>}
            <Link className='text-light mr-3 text-decoration-none' to={route.path}>
              {route.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};