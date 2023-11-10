import { useEffect, useState } from "react";
import { WorkPopup } from "../../components/popups/activity/student-view-work";
import { CreateActivityPopup } from "../../components/popups/activity/teacher-create-activity";
import { ActivityCard } from "../../components/Cards/Card.Activity";
import { useFetchTeams } from "../../hooks/useTeam";
import { useNavigate } from "react-router-dom";
import { useFetchCourses } from "../../hooks/useCourse";
import {
	useGetActivityByTeam,
	useFetchActivities,
	useGetActivitiesByClass,
	useGetSubmittedActivitiesByTeam,
} from "../../hooks/useActivity";
import { useFetchClasses } from "../../hooks/useClass";
import { ClassCard } from "../../components/Cards/Card.Class";
import { FiChevronLeft } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	setStudentModel,
	selectCurrentTeam,
	selectStudentModel,
} from "../../features/slice/studentModelSlice"; // Import the student model slice
import { loadFromLocalStorage } from "../../components/utils/utils";
import { useCreateWork, useFetchWorksByActivity } from "../../hooks/useWork";
import { WorkCard } from "../../components/Cards/Card.Work";

export const Student_ActivitySection = () => {
	const [team, setTeam] = useState([]);
	const [selectedActivity, setSelectedActivity] = useState(null);

	const fetchedTeams = useFetchTeams();
	const fetchedClasses = useFetchClasses();
	const { fetchActivitiesByClass } = useGetActivitiesByClass();

	useEffect(() => {
		const filteredTeams = fetchedTeams.filter((team) => team.id === team_id);
		setTeam(filteredTeams);
	}, [fetchedTeams]);

	const courses = useFetchCourses();
	const [selectedTeam, setSelectedTeam] = useState(null);
	const [selectedCourse, setSelectedCourse] = useState("All");
	const [searchInput, setSearchInput] = useState("");
	const [showActivity, setShowActivity] = useState(false);
	const navigate = useNavigate();

	const dispatch = useDispatch();
	// Load the student model data when the component mounts
	useEffect(() => {
		const savedStudentModel = loadFromLocalStorage("studentModel");
		if (savedStudentModel) {
			// Dispatch an action to set the loaded data into Redux state
			dispatch(setStudentModel(savedStudentModel));
		}
	}, []);

	const team_id = useSelector(selectCurrentTeam);
	console.log(team_id);

	// this gets all the activities of the team belong to the user
	const teamactivity = useGetActivityByTeam(team_id);
	console.log(teamactivity);
	const [activities, setActivities] = useState([]);

	const [selectedFilter, setSelectedFilter] = useState(0);

	const [unfilteredActivities, setUnfilteredActivities] = useState([]);

	const setActivitiesAndUnfiltered = (activities) => {
		setActivities(activities);
		setUnfilteredActivities(activities);
		console.log(activities);
	};

	// used to set the activities and unfiltered activities on the first render
	useEffect(() => {
		setActivitiesAndUnfiltered(teamactivity);
	}, [teamactivity]);

	const handleFilterActivities = (filter) => {
		let filteredActivities;

		switch (filter) {
			case 0:
				setActivities(unfilteredActivities);
				setSelectedFilter(0);
				break;
			case 1:
				filteredActivities = unfilteredActivities.filter(
					(activity) => activity.submission_status === true
				);
				setActivities(filteredActivities);
				setSelectedFilter(1);
				break;
			case 2:
				filteredActivities = unfilteredActivities.filter(
					(activity) => activity.submission_status === false
				);
				setActivities(filteredActivities);
				setSelectedFilter(2);
				break;
		}
	};

	const submittedByTeam = useGetSubmittedActivitiesByTeam(team_id);

	// this gets all the activities unfiltered
	const getAllActivities = teamactivity;

	// classes is the state where all the classes are stored
	const [classes, setClasses] = useState([]);
	const [selectedClass, setSelectedClass] = useState(null);

	const handleToSelectedActivity = (activity) => {
		navigate(`${activity.id}`);
		console.log(activity);
	};

	return (
		<div className='container-md'>
			<div className='container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3'>
				<div className='d-flex flex-row justify-content-between'>
					<div className='d-flex flex-row'>
						<h4 className='fw-bold m-0'>Activities</h4>
					</div>
					<div className='d-flex flex-row gap-3 '>
						<button
							className='btn btn-primary btn-block fw-bold bw-3 m-0'
							onClick={() => navigate("new")}
						>
							Add Activity
						</button>
						<button
							className='btn btn-outline-secondary btn-block fw-bold bw-3 m-0'
							onClick={() => {
								navigate("templates");
							}}
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
						<label htmlFor='teamFilter' className='m-0'>
							Team: {team[0]?.name}
						</label>
					</div>
				</div>

				<div className='d-flex flex-column gap-3'>
					{activities && (
						<>
							<div className='d-flex flex-row gap-3'>
								<button
									className={`btn ${
										selectedFilter === 0 ? "btn-secondary" : "btn-outline-dark"
									} bw-3 m-0 col-md-2`}
									onClick={() => handleFilterActivities(0)}
								>
									All
								</button>
								<button
									className={`btn ${
										selectedFilter === 1 ? "btn-secondary" : "btn-outline-dark"
									} bw-3 m-0 col-md-2`}
									onClick={() => handleFilterActivities(1)}
								>
									Submitted
								</button>
								<button
									className={`btn ${
										selectedFilter === 2 ? "btn-secondary" : "btn-outline-dark"
									} bw-3 m-0 col-md-2`}
									onClick={() => handleFilterActivities(2)}
								>
									Unsubmitted
								</button>
							</div>
							{activities.map((activity, index) => (
								<ActivityCard
									key={index}
									title={activity.title}
									description={activity.description}
									dateAdded={activity.date_added}
									submissionStatus={activity.submission_status}
									dueDate={activity.due_date}
									// Add other props as needed
									onClick={() => handleToSelectedActivity(activity)}
								/>
							))}
						</>
					)}
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
