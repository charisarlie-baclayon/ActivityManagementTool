import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ActivityPopup } from "../../components/popups/activity/teacher-view-activity";
import { CreateActivityPopup } from "../../components/popups/activity/teacher-create-activity";
import { ActivityCard } from "../../components/Cards/Card.Activity";
//import { useFetchActivities } from "../../hooks/useActivity";

export const Student_ActivitySection = () => {
	const navigate = useNavigate();
	const activity = [];
	//const activity = useFetchActivities();
	const [searchInput, setSearchInput] = useState("");

	const [showModal, setShowModal] = useState(false);

	const [showActivity, setShowActivity] = useState(false);
	const handleCloseActivity = () => setShowActivity(false);

	const [selectedActivity, setSelectedActivity] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setActivity(response);

				setActivity([{ title: 'Activity 1', description: 'description' }, { title: 'Activity 2', description: 'description' }])
				console.log(activity);
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

	const handleNavigateToCreateActivity = () => {
		navigate("/student/activities/new"); // Navigate to the desired route
	};

	return (
		<div className="container-md">
			<div className="container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3">
				<div className="d-flex flex-row justify-content-between">
					<div className="d-flex flex-row">
						<h4 className='fw-bold m-0'>Activities</h4>
					</div>
					<div>
						<button
							className='btn btn-primary btn-block fw-bold bw-3 m-0'
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

			</div>
		</div>
	);
};
