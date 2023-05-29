import VerticalNavBar from '../../assets/common/vertical-nav-bar';
import './../../assets/css/ViewActivities.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewActivities = () => {

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

    const handleToSelectedActivity = async (act) => {
      //navigate('/activity', { state: { act } });
    };

  return (
    <div>
        <VerticalNavBar></VerticalNavBar>
        <div className='page-body'>
            <div className='activities-header'>
                <p className='activity-text'>Activities</p>
                <button className='activity-button'>Add Activity</button>
            </div>
            <div className='scroll-container'>
                {activity.map((act, index) => (
                    <div className="activity-list" key={index} onClick={() => handleToSelectedActivity(act)}>
                        <div className='activity-bound'>
                            <p id="activity-name">{act.name}</p>
                            <p id="activity-description">{act.description}</p>{' '}
                            <p id="activity-link">{act.link}</p>{' '}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ViewActivities