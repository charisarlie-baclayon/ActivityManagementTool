import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { NavBar } from "../../components/NavBar/NavBar.Teacher";
import { SideBar } from "../../components/SideBar/SideBar.Teacher";

export const Teacher = ({ isSidebarOpen }) => {
  return (
    <div className="d-flex flex-row view-sidebar">
      <SideBar/>
      <div className="w-100"> 
        <NavBar/>
        <Outlet/>
      </div>
    </div>
  );
};
