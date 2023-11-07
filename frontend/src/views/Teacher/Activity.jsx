import { useEffect, useState } from "react";
import { ActivityPopup } from "../../components/popups/activity/teacher-view-activity";
import { CreateActivityPopup } from "../../components/popups/activity/teacher-create-activity";
import { ActivityCard } from "../../components/Cards/Card.Activity";
import { useFetchTeams } from "../../hooks/useTeam";
import { useNavigate } from "react-router-dom";
import { useFetchCourses } from "../../hooks/useCourse";
import { useGetActivityByTeam } from "../../hooks/useActivity"; // Import the new hook

export const Teacher_ActivitySection = () => {
	const teams = useFetchTeams();
	const courses = useFetchCourses();
	const [selectedTeam, setSelectedTeam] = useState(null);
	const [selectedCourse, setSelectedCourse] = useState(null);
	const [searchInput, setSearchInput] = useState("");
	const [showActivity, setShowActivity] = useState(false);
	const [selectedActivity, setSelectedActivity] = useState(null);
	const navigate = useNavigate();
	const teamActivities = useGetActivityByTeam(1);
	// Fetch activities for the selected team using the useGetActivityByTeam hook

	const handleToSelectedActivity = (activity) => {
		setSelectedActivity(activity);
		setShowActivity(true);
	};

	const handleTeamChange = (teamId) => {
		setSelectedTeam(teamId);
	};

	const handleCourseChange = (courseId) => {
		setSelectedCourse(courseId);
	};

	return (
		<div className='container-md'>
			<div className='container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3'>
				<div className='d-flex flex-row justify-content-between'>
					<div className="d-flex flex-row">
						<h4 className='fw-bold m-0'>Activities</h4>
					</div>
					<div className="d-flex flex-row gap-3 ">
						<button
							className='btn btn-primary btn-block fw-bold bw-3 m-0'
							onClick={() => navigate('new')}
						>
							Add Activity
						</button>
						<button
							className='btn btn-outline-secondary btn-block fw-bold bw-3 m-0'
							onClick={() => { navigate('templates') }}
						>
							Use Templates
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
						<label htmlFor='courseFilter' className='m-0'>
							Course:
						</label>
						<select id='courseFilter' className='form-select border-dark' onChange={(e) => handleCourseChange(e.target.value)}>
							<option value='All'>All</option>
							{courses && courses.map((courseItem) => (
								<option key={courseItem.id} value={courseItem.id}>{courseItem.name}</option>
							))}
						</select>
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
					{teamActivities && teamActivities.map((act, index) => (
						<ActivityCard
							key={index}
							{...act}
							onClick={() => handleToSelectedActivity(act)}
						/>
					))}
				</div>

				{selectedActivity && (
					<ActivityPopup
						show={showActivity}
						handleClose={() => setShowActivity(false)}
						activity={selectedActivity}
					/>
				)}
			</div>
		</div>
	);
};
