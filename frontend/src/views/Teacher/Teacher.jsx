import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { NavBar } from "../../components/NavBar/NavBar.Teacher";
import { SideBar } from "../../components/SideBar/SideBar.Teacher";
import { Teacher_HomeSection } from "./Teacher.Home";

export const Teacher = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/activities/');
        setActivity(response.data.activities);
        console.log(response.data.activities);
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    };

    fetchData();
  }, []);

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
