import React, { useEffect } from 'react';
import './vertical-nav-bar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

function VerticalNavBar() {
    useEffect(() => {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function() {
          $('#sidebar, #content').toggleClass('active');
        });
    }, []);
  return (
    <>
    {/* Vertical navbar */}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    <div className="vertical-nav bg-white" id="sidebar">
        <div className="py-4 px-3 mb-4 bg-light">
        <div className="media d-flex align-items-center">
            <img
            src="https://bootstrapious.com/i/snippets/sn-v-nav/avatar.png"
            alt="..."
            width={65}
            className="mr-3 rounded-circle img-thumbnail shadow-sm"
            />
            <div className="media-body">
            <h4 className="m-0">Jason Doe</h4>
            <p className="font-weight-light text-muted mb-0">Web developer</p>
            </div>
        </div>
        </div>
        <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">
        Main
        </p>
        <ul className="nav flex-column bg-white mb-0">
        <li className="nav-item">
            <a href="#" className="nav-link text-dark font-italic bg-light">
            <i className="fa fa-th-large mr-3 text-primary fa-fw" />
            Home
            </a>
        </li>
        <li className="nav-item">
            <a href="#" className="nav-link text-dark font-italic">
            <i className="fa fa-address-card mr-3 text-primary fa-fw" />
            About
            </a>
        </li>
        <li className="nav-item">
            <a href="#" className="nav-link text-dark font-italic">
            <i className="fa fa-cubes mr-3 text-primary fa-fw" />
            Services
            </a>
        </li>
        <li className="nav-item">
            <a href="#" className="nav-link text-dark font-italic">
            <i className="fa fa-picture-o mr-3 text-primary fa-fw" />
            Gallery
            </a>
        </li>
        </ul>
        <p className="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">
        Charts
        </p>
        <ul className="nav flex-column bg-white mb-0">
        <li className="nav-item">
            <a href="#" className="nav-link text-dark font-italic">
            <i className="fa fa-area-chart mr-3 text-primary fa-fw" />
            Area charts
            </a>
        </li>
        <li className="nav-item">
            <a href="#" className="nav-link text-dark font-italic">
            <i className="fa fa-bar-chart mr-3 text-primary fa-fw" />
            Bar charts
            </a>
        </li>
        <li className="nav-item">
            <a href="#" className="nav-link text-dark font-italic">
            <i className="fa fa-pie-chart mr-3 text-primary fa-fw" />
            Pie charts
            </a>
        </li>
        <li className="nav-item">
            <a href="#" className="nav-link text-dark font-italic">
            <i className="fa fa-line-chart mr-3 text-primary fa-fw" />
            Line charts
            </a>
        </li>
        </ul>
    </div>
    {/* End vertical navbar */}
    
    </>
  );
}

export default VerticalNavBar;