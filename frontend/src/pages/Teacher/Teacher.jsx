import React from "react";
import { Outlet } from "react-router-dom";

export const Teacher = ({isSidebarOpen}) => {
  return (
    <div className={`view-sidebar ${isSidebarOpen ? '' : 'open'}`}>
      <Outlet />
    </div>
  );
};
