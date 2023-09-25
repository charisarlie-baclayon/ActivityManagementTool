import React, { useState } from 'react';
import {
  FiSearch,
  FiBell,
  FiSettings,
  FiHelpCircle,
  FiUser,
} from 'react-icons/fi';

export const NavBar = () => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  const handleNavbarToggle = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-black fixed-top">
      <div className="container">
        <button
          className="navbar-toggler text-fs-4"
          type="button"
          data-toggle="collapse"
          data-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded={!isNavbarCollapsed}
          onClick={handleNavbarToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`} id="navbarContent">
          <div className="navbar-nav ml-auto gap-3">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text text-fs-5">
                  <FiSearch />
                </span>
              </div>
              <input type="text" className="form-control text-fs-5" placeholder="Search" />
            </div>
            <span className="nav-item nav-link text-fs-4">
              {isNavbarCollapsed ? <FiBell /> : 'Notification'}
            </span>
            <span className="nav-item nav-link text-fs-4">
              {isNavbarCollapsed ? <FiSettings /> : 'Settings'}
            </span>
            <span className="nav-item nav-link text-fs-4">
              {isNavbarCollapsed ? <FiHelpCircle /> : 'Help'}
            </span>
            <span className="nav-item nav-link text-fs-4">
              {isNavbarCollapsed ? <FiUser /> : 'User'}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};
