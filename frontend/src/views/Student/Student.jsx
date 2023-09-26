import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { NavBar } from "../../components/NavBar/NavBar.Student";
import { SideBar } from "../../components/SideBar/SideBar.Student";
import { Student_HomeSection } from "./Student.Home";

export const Student = ({ isSidebarOpen }) => {
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
    <div >
      <SideBar/>
      <div className="view-sidebar"> {/* Added a custom class for styling */}
        <NavBar/>
        <Student_HomeSection />
      </div>
    </div>
  );
};
