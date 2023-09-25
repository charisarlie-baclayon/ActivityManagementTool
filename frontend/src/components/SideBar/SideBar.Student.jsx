import React, { useState } from 'react';
import logo from '../../assets/img/logo/logo-incubatee-primary-2.png';
import './SideBar.Student.css';

export const SideBar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="container-fluid ">
      <div className="row flex-nowrap ">
        <div className={`fixed-top col-md-2 bg-dark ${ isSidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="d-flex flex-column align-items-center min-vh-100  shadow">
            <div className="sidebar-logo">
                <a href='/home' className='sidebar-logo-link'>
                    <img src={logo} alt='Your Logo' />
                </a>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};
