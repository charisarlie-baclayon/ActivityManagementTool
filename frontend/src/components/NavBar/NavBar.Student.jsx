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
    <nav className="navbar navbar-expand-md navbar-dark bg-black">
      <div className="container">
        <button
          className="navbar-toggler text-fs-5"
          type="button"
          data-toggle="collapse"
          data-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded={!isNavbarCollapsed}
          onClick={handleNavbarToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse gap-5 navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`} id="navbarContent">
            <div className="input-group align-items-center">
              <div className="input-group-prepend  input-height-1">
                <span className="input-group-text text-fs-5">
                  <FiSearch />
                </span>
              </div>
              <input type="text" className="form-control  input-height-1 text-fs-5" placeholder="Search" />
            </div>
          <div className="navbar-nav ml-auto">
            <span className="nav-item nav-link text-fs-5">
              {isNavbarCollapsed ? <FiBell /> : 'Notification'}
            </span>
            <span className="nav-item nav-link text-fs-5">
              {isNavbarCollapsed ? <FiSettings /> : 'Settings'}
            </span>
            <span className="nav-item nav-link text-fs-5">
              {isNavbarCollapsed ? <FiHelpCircle /> : 'Help'}
            </span>
            <span className="nav-item nav-link text-fs-5">
              {isNavbarCollapsed ? <FiUser /> : 'User'}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};
