import React from "react";
import { Outlet } from "react-router-dom";

export const Teacher = () => {
  return (
    <div>
      Teacher Dashboards
      <Outlet />
    </div>
  );
};
