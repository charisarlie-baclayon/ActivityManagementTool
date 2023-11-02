import React, { useEffect, useState } from "react";
import { ActivityPopup } from "../../components/popups/activity/teacher-view-activity";
import { CreateActivityPopup } from "../../components/popups/activity/teacher-create-activity";
import { ActivityCard } from "../../components/Cards/Card.Activity";
import { useFetchActivities } from "../../hooks/useActivity";

export const Teacher_ActivitySection = () => {
  const activity = useFetchActivities();
  const [searchInput, setSearchInput] = useState("");

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [showActivity, setShowActivity] = useState(false);
  const handleCloseActivity = () => setShowActivity(false);

  const [selectedActivity, setSelectedActivity] = useState(null);


  const handleToSelectedActivity = (activity) => {
    setSelectedActivity(activity);
    setShowActivity(true);
  };

  return (
    <div className="container-md">
      <div className="container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3">
        <div className="d-flex flex-row justify-content-between">
          <h4 className="fw-bold">Activities</h4>
          <div>
            <button
              className="btn btn-secondary btn-block fw-bold bw-3"
              onClick={handleShowModal}
            >
              Add Activity
            </button>
          </div>
        </div>
        <hr className="text-dark" />

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
        <div className="d-flex flex-row gap-3 align-items-center w-25">
            <label htmlFor="statusFilter" className="m-0">
              Status:
            </label>
            <select
              id="statusFilter"
              className="form-select border-dark "
            >
              <option value="All">All</option>
            </select>
          </div>
        </div>

        <div className="d-flex flex-column gap-3">
          {activity.map((act, index) => (
            <ActivityCard
              key={index}
              {...act}
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
