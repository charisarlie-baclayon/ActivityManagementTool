<<<<<<< HEAD
import { Outlet} from "react-router-dom";
import { Teacher_NavBar } from "../../components/NavBar/Teacher";
import { Teacher_SideBar } from "../../components/SideBar/Teacher";

export const Teacher = () => {
=======
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { NavBar } from "../../components/NavBar/NavBar.Teacher";
import { SideBar } from "../../components/SideBar/SideBar.Teacher";

export const Teacher = ({ isSidebarOpen }) => {
>>>>>>> 190f2debb8dc343bc169b841ae312bd701f0dcdf
  return (
    <div className="d-flex flex-row view-sidebar">
      <Teacher_SideBar/>
      <div className="w-100"> 
        <Teacher_NavBar/>
        <Outlet/>
      </div>
    </div>
  );
};