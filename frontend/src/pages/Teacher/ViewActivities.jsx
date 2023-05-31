import "./../../assets/css/ViewActivities.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ActivityRowCard } from "../../assets/common/Activity/activity-row-card";
import CreateActivity from "./CreateActivity";

const ViewActivities = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const [activity, setActivity] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/activities/"
        );
        setActivity(response.data.activities);
        console.log(response.data.activities);
      } catch (error) {
        console.error("Error fetching activity data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/activities/"
        );
        setActivity(response.data.activities);
        console.log(response.data.activities);
      } catch (error) {
        console.error("Error fetching activity data:", error);
      }
    };

    fetchData();
  }, [showModal]);

  const handleToSelectedActivity = async (act) => {
    //navigate('/activity', { state: { act } });
  };

  return (
    <>
      <h1>Activities</h1>
      <button className="activity-button" onClick={handleShowModal}>
        Add Activity
      </button>

      <div class="search_bar">
        <input type="search" placeholder="Search activity here..." />
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
      <div className="scroll-container">
        {activity.map((act, index) => (
          <ActivityRowCard key={index} {...act} />
        ))}
      </div>

      <CreateActivity show={showModal} handleClose={handleCloseModal} />
    </>
  );
};

export default ViewActivities;
