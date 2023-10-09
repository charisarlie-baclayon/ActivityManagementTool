import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ActivityRowCard } from "../../assets/common/Activity/activity-row-card";
import CreateActivity from "./CreateActivity";
import { ViewSelectedActivity } from "./ViewSelectedActivity";
import { FiSearch } from "react-icons/fi";

const ViewActivities = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const [activity, setActivity] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [selectedStatus, setSelectedStatus] = useState("All"); // State for selected status filter

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [showActivity, setShowActivity] = useState(false);
  const handleCloseActivity = () => setShowActivity(false);

  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/activities/"
        );
        setActivity(response.data.activities);
      } catch (error) {
        console.error("Error fetching activity data:", error);
      }
    };

    fetchData();
  }, [showModal, showActivity]);

  const handleToSelectedActivity = (act) => {
    setSelectedActivity(act);
    setShowActivity(true);
  };

  // Extract unique status values from activity data
  const uniqueStatuses = [...new Set(activity.map((act) => act.status))];

  // Generate options for the status filter dropdown
  const statusFilterOptions = uniqueStatuses.map((status) => (
    <option key={status} value={status}>
      {status}
    </option>
  ));

  // Filter activities based on search input and selected status
  const filteredActivities = activity.filter((act) => {
    const isStatusMatch =
      selectedStatus === "All" || act.status === selectedStatus;
    const isSearchMatch =
      act.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      act.description.toLowerCase().includes(searchInput.toLowerCase());

    return isStatusMatch && isSearchMatch;
  });

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
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All</option>
              {statusFilterOptions}
            </select>
          </div>
        </div>

        <div className="d-flex flex-column gap-3">
          {filteredActivities.map((act, index) => (
            <ActivityRowCard
              key={index}
              {...act}
              onClick={() => handleToSelectedActivity(act)}
            />
          ))}
        </div>

        <CreateActivity show={showModal} handleClose={handleCloseModal} />

        {selectedActivity && (
          <ViewSelectedActivity
            show={showActivity}
            handleClose={handleCloseActivity}
            act={selectedActivity}
          />
        )}
      </div>
    </div>
  );
};

export default ViewActivities;
