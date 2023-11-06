import { useEffect, useState } from "react";
import { ActivityPopup } from "../../components/popups/activity/teacher-view-activity";
import { CreateActivityPopup } from "../../components/popups/activity/teacher-create-activity";
import { ActivityCard } from "../../components/Cards/Card.Activity";
import { useFetchTeams } from "../../hooks/useTeam";
import { useGetActivityByTeam, useGetSubmittedActivitiesByTeam } from "../../hooks/useActivity";

export const Teacher_ActivitySection = () => {
	const teams = useFetchTeams(); // Use the useFetchTeams hook
	const [selectedTeam, setSelectedTeam] = useState(null);
	const activities = useGetSubmittedActivitiesByTeam(selectedTeam); // Assuming there's a useGetActivitiesByTeam hook

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

	const handleTeamChange = (teamId) => {
		setSelectedTeam(teamId);
	};

	return (
		<div className='container-md'>
			<div className='container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3'>
				<div className='d-flex flex-row justify-content-between'>
					<div className="d-flex flex-row">
						<h4 className='fw-bold m-0'>Activities</h4>
					</div>
					<div>
						<button
							className='btn btn-primary btn-block fw-bold bw-3 m-0'
							onClick={handleShowModal}
						>
							Add Activity
						</button>
					</div>
				</div>
				<hr className='text-dark' />

				<div className='d-flex flex-row gap-3 '>
					<div className='input-group align-items-center'>
						<input
							type='text'
							className='form-control border-dark'
							placeholder='Search'
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
						/>
					</div>
					<div className='d-flex flex-row gap-3 align-items-center w-25'>
						<label htmlFor='teamFilter' className='m-0'>
							Team:
						</label>
						<select id='teamFilter' className='form-select border-dark' onChange={(e) => handleTeamChange(e.target.value)}>
							<option value='All'>All</option>
							{teams && teams.map((teamItem) => (
								<option key={teamItem.id} value={teamItem.id}>{teamItem.name}</option>
							))}
						</select>
					</div>
				</div>

				<div className='d-flex flex-column gap-3'>
					{activities && activities.map((act, index) => (
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
