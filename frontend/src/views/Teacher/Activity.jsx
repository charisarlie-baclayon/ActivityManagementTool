import { useEffect, useState } from "react";
import { ActivityPopup } from "../../components/popups/activity/teacher-view-activity";
import { CreateActivityPopup } from "../../components/popups/activity/teacher-create-activity";
import { ActivityCard } from "../../components/Cards/Card.Activity";
import { useFetchClasses } from "../../hooks/useClass";
import { useFetchTeams } from "../../hooks/useTeam";
import {
	useGetActivitiesByClass,
	useGetActivitiesByTeam,
} from "../../hooks/useActivity";
import { useNavigate } from "react-router-dom";
import { ClassCard } from "../../components/Cards/Card.Class";
import { TeamCard } from "../../components/Cards/Card.Team";

import {
	useGetActivitiesByClassMutation,
	useGetActivitiesByTeamMutation,
} from "../../Api/Activity";

export const Teacher_ActivitySection = () => {
	// const { getActivitiesByClass } = useGetActivitiesByClass();
	// const { getActivitiesByTeam } = useGetActivitiesByTeam();

	const classes = useFetchClasses();
	const teams = useFetchTeams();
	const [byClass, setByClass] = useState(false);
	const [byTeam, setByTeam] = useState(false);

	const [activities, setActivities] = useState(null);

	const navigate = useNavigate();

	const [searchInput, setSearchInput] = useState("");

	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);

	const [showActivity, setShowActivity] = useState(false);
	const handleCloseActivity = () => setShowActivity(false);

	// selected class, view ang activities
	const [selectedActivity, setSelectedActivity] = useState(null);

	// const handleToSelectedActivity = (activity) => {
	// 	setSelectedActivity(activity);
	// 	setShowActivity(true);
	// };

	// i do not know how to get away with this eslint error

	const [getActivitiesByClass] = useGetActivitiesByClassMutation();
	const navigateToClass = async (classId) => {
		const activities = await getActivitiesByClass(classId);
		setActivities(activities);
		console.log(activities);
	};

	// Function to handle fetching activities by team
	const [getActivitiesByTeam] = useGetActivitiesByTeamMutation();
	const navigateToTeam = async (teamId) => {
		const activities = await getActivitiesByTeam(teamId);
		setActivities(activities);
		console.log(activities);
	};

	// kani iyang e change ang state sa activities shown

	const handleActivitiesByClass = () => {
		console.log(classes);
		setByClass(true);
		setByTeam(false);
	};

	const handleActivitiesByTeam = () => {
		console.log(teams);
		setByTeam(true);
		setByClass(false);
	};

	return (
		<div className='container-md'>
			<div className='container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3'>
				<div className='d-flex flex-row justify-content-between'>
					<h4 className='fw-bold'>Activities</h4>
					<div>
						<button
							className='btn btn-secondary btn-block fw-bold bw-3'
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
						<label htmlFor='statusFilter' className='m-0'>
							Status:
						</label>
						<select id='statusFilter' className='form-select border-dark '>
							<option value='All'>All</option>
						</select>
					</div>
				</div>
				<div className='d-flex flex-column gap-3'>
					<div className='row'>
						<div className='col-md-3 mb-3'>
							<button
								className='btn btn-white btn-block  bw-3'
								onClick={handleActivitiesByTeam}
							>
								Team
							</button>
						</div>
						<div className='col-md-3 mb-3'>
							<button
								className='btn btn-white btn-block  bw-3'
								onClick={handleActivitiesByClass}
							>
								Class
							</button>
						</div>
					</div>
				</div>
				<div className='d-flex flex-column gap-3'>
					<div className='row'>
						{byTeam &&
							Array.isArray(teams) &&
							teams.map((teamItem) => (
								<div key={teamItem.id} className='col-md-3 mb-3'>
									<TeamCard
										teamData={teamItem}
										onClick={() => navigateToTeam(teamItem.id)}
									/>
								</div>
							))}

						{byClass &&
							Array.isArray(classes) &&
							classes.map((classItem) => (
								<div key={classItem.id} className='col-md-3 mb-3'>
									<ClassCard
										classData={classItem}
										onClick={() => navigateToClass(classItem.id)}
									/>
								</div>
							))}
					</div>
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
