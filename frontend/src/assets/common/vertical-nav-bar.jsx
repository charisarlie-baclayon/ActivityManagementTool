import { useState } from 'react';
import './vertical-nav-bar.css';

function VerticalNavBar() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setDarkMode] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSearchBtnClick = () => {
    setSidebarOpen(false);
  };

  const handleModeSwitch = () => {
    setDarkMode(!isDarkMode);
  
    // Toggle body class based on dark mode state
    if (!isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };
  return (
    <>
    <link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"></link>
    <nav className={`sidebar ${isSidebarOpen ? 'close' : ''}`}>
    <header>
      <div className="image-text">
        <span className="image"><img src='../img/wils-logo.png' alt="default"/></span>
        <div className="text logo-text">
          <span className="name">WIL's Incubatee</span>
          <span className="profession">CIT-U</span>
        </div>
      </div>
      <i className="bx bx-chevron-right toggle" onClick={handleToggleSidebar} />
    </header>
    <div className="menu-bar">
      <div className="menu">
        <li className="search-box" onClick={handleSearchBtnClick}>
          <i className="bx bx-search icon" />
          <input type="text" placeholder="Search..." />
        </li>
        <ul className="menu-links">
          <li className="nav-link">
            <a href="#">
              <i className="bx bx-home-alt icon" />
              <span className="text nav-text">Dashboard</span>
            </a>
          </li>
          <li className="nav-link">
            <a href="#">
              <i className="bx bx-bar-chart-alt-2 icon" />
              <span className="text nav-text">Revenue</span>
            </a>
          </li>
          <li className="nav-link">
            <a href="#">
              <i className="bx bx-bell icon" />
              <span className="text nav-text">Notifications</span>
            </a>
          </li>
          <li className="nav-link">
            <a href="#">
              <i className="bx bx-pie-chart-alt icon" />
              <span className="text nav-text">Analytics</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="bottom-content">
        <li className="">
          <a href="#">
            <i className="bx bx-log-out icon" />
            <span className="text nav-text">Logout</span>
          </a>
        </li>
        <li className="mode">
          <div className="sun-moon">
            <i className="bx bx-moon icon moon" />
            <i className="bx bx-sun icon sun" />
          </div>
          <span className="mode-text text">Dark mode</span>
          <div className="toggle-switch" onClick={handleModeSwitch}>
            <span className="switch" />
          </div>
        </li>
      </div>
    </div>
  </nav>
</>

  );
}

export default VerticalNavBar;