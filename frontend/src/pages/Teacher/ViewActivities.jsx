import VerticalNavBar from '../../assets/common/vertical-nav-bar';
import './../../assets/css/ViewActivities.css';
import { Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ActivityRowCard } from '../../assets/common/Activity/activity-row-card';
import "./CreateActivities.css";
import CreateActivities from './CreateActivities';

const ViewActivities = () => {
  const navigate = useNavigate();
  const [activity, setActivity] = useState([]);
  const [isCreatingActivity, setIsCreatingActivity] = useState(false);

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

  const handleCreateActivity = (newActivity) => {
    // Handle the creation of the movie data here
    console.log('New Activity:', newActivity);
    // Implement your logic to create the movie with the provided data
  };


    const handleToSelectedActivity = async (act) => {
      //navigate('/activity', { state: { act } });
    };

  return (
    <div className='page-body'>
        <div class="row">
        <h1>Activities</h1>
        <button className='create-activity' 
                onClick={() => setIsCreatingActivity(true)}>Create Activity</button>
        </div>
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
        <div className='scroll-container'>
        <div>
          {activity.map((act, index) => (
            <ActivityRowCard key={index} {...act} />
          ))}
          <Outlet />
        </div>

        {/* "ActivityCreate" component */}
        {isCreatingActivity && (
          <div className="overlay">
            <div className="popup">
              <CreateActivities onCreateMovie={handleCreateActivity} />
              <button
                className="close-button"
                onClick={() => setIsCreatingMovie(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        </div>
    </div>
  )
}

export default ViewActivities