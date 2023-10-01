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
    <nav className="navbar navbar-expand-md navbar-dark bg-black pl-3 pr-3">
      <div className="container-md">
        <button
          className="navbar-toggler"
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
              <input type="text" className="form-control " placeholder="Search" />
            </div>
          <div className="navbar-nav ml-auto gap-3">
            <span className="nav-item nav-link">
              {isNavbarCollapsed ? <FiBell /> : 'Notification'}
            </span>
            <span className="nav-item nav-link">
              {isNavbarCollapsed ? <FiSettings /> : 'Settings'}
            </span>
            <span className="nav-item nav-link">
              {isNavbarCollapsed ? <FiHelpCircle /> : 'Help'}
            </span>
            <span className="nav-item nav-link">
              {isNavbarCollapsed ? <FiUser /> : 'User'}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};
