import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ActivityRowCard } from "../../assets/common/Activity/activity-row-card";
import { ActivityPopup } from "../../components/popups/activity/teacher-view-activity";
import { CreateActivityPopup } from "../../components/popups/activity/teacher-create-activity";
import { readActivities } from "../../Api/Activity";

export const Teacher_ActivitySection = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const [activity, setActivity] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [showActivity, setShowActivity] = useState(false);
  const handleCloseActivity = () => setShowActivity(false);

  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readActivities();
        setActivity(response);
      } catch (error) {
        console.error("Error fetching activity data:", error);
      }
    };

    fetchData();
  }, [showModal, showActivity]);

  const handleToSelectedActivity = (activity) => {
    setSelectedActivity(activity);
    setShowActivity(true);
  };

  return (
    <div className="container-md">
      <div className="container-md d-flex flex-column gap-5 mt-5 pr-3 pl-3">
        <div className="d-flex flex-row justify-content-between">
          <h3 className="fw-bold">Activities</h3>
          <div>
            <button
              className="btn btn-secondary btn-block fw-bold bw-3"
              onClick={handleShowModal}
            >
              Add Activity
            </button>
          </div>
        </div>
        <hr className="text-dark m-0 " />

        <div className="d-flex flex-row gap-3 ">
        <div className="input-group align-items-center">
          <input
            type="text"
            className="form-control border-dark"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="d-flex flex-row gap-3 align-items-center ">
            <label htmlFor="statusFilter" className="m-0">
              Status:
            </label>
            <select
              id="statusFilter"
              className="form-select border-dark"
            >
              <option value="All">All</option>
            </select>
          </div>
        </div>

        <div className="d-flex flex-column gap-3">
          {activity.map((act, index) => (
            <ActivityRowCard
              key={index}
              onClick={() => handleToSelectedActivity(act)}
            />
          ))}
        </div>

        <CreateActivityPopup show={showModal} handleClose={handleCloseModal} />

        {selectedActivity && (
          <ActivityPopup
            show={showActivity}
            handleClose={handleCloseActivity}
            activity={selectedActivity}
          />
        )}
      </div>
    </div>
  );
};
