import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ActivityRowCard } from "../../assets/common/Activity/activity-row-card";
import axios from "axios";

export const Student = () => {
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
      <>
        <h1>Activities</h1>
        
        <div class="search_bar">
          <input type="search" placeholder="Search activity here..."/>
          <select name="" id="">
            <option>Category</option>
            <option>Web Design</option>
            <option>App Design</option>
            <option>App Development</option>
          </select>
          <select class="filter">
            <option>Filter</option>
          </select>
        </div>

        <div class="row">
          <p>You can do it!</p>
          <a>See all</a>
        </div>
        <div>
          {activity.map((act, index) => (
            <ActivityRowCard key={index} {...act} />
          ))}
          <Outlet />
        </div>
      </>
    );
};
