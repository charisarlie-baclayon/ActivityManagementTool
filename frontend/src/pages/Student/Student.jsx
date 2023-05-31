import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ActivityRowCard } from "../../assets/common/Activity/activity-row-card";
import axios from "axios";
import './../../assets/common/Activity/activity-row-card.css';

export const Student = ({isSidebarOpen}) => {
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
      <div className={`view-sidebar ${isSidebarOpen ? '' : 'open'}`}>
        <h1>Activities</h1>
        
        <div class="search_bar">
          <input type="search" placeholder="Search activity here..."/>
          <select name="" id="">
            <option>Category</option>
          </select>
          <select class="filter">
            <option>Filter</option>
          </select>
        </div>

        <div class="tags_bar">
          <div class="tag">
            <i class="bx bx-x"></i>
            <span>Complete</span>
          </div>
          <div class="tag">
            <i class="bx bx-x"></i>
            <span>Incomplete</span>
          </div>
          <div class="tag">
            <i class="bx bx-x"></i>
            <span>In-Progress</span>
          </div>
        </div>

        <div class="row">
        <br/>
        </div>
        <div className = 'scroll-container'>
          {activity.map((act, index) => (
            <ActivityRowCard key={index} {...act} />
          ))}
          <Outlet />
        </div>
      </div>
    );
};
