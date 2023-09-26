import React, { useState } from 'react';
import { FiHome, FiBook, FiActivity } from 'react-icons/fi';
import logo from '../../assets/img/logo/logo-incubatee-primary-2.png';
import './SideBar.Student.css';

export const SideBar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`sidebar fixed-top bg-dark shadow-lg ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="d-flex flex-column align-items-center min-vh-100 gap-3"> {/* Change align-items-center to align-items-start */}
        <div className="sidebar-logo">
          <a href='/home' className='sidebar-logo-link'>
            <img src={logo} alt='Your Logo' />
          </a>
        </div>
        <div className="sidebar-links d-flex flex-column text-light text-fs-3 gap-3 ">
          <div className="sidebar-link d-flex gap-2 align-items-center ">
            <FiHome />
            <a href="/dashboard">Dashboard</a>
          </div>
          <div className="sidebar-link d-flex gap-2 align-items-center ">
            <FiBook />
            <a href="/class">Class</a>
          </div>
          <div className="sidebar-link d-flex gap-2 align-items-center ">
            <FiActivity />
            <a href="/activity">Activity</a>
          </div>
        </div>
      </div>
    </div>
  );
};
