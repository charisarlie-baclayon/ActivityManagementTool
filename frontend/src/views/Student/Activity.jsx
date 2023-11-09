import { useEffect, useState } from "react";
import { ActivityPopup } from "../../components/popups/activity/student-view-activity";
import { CreateActivityPopup } from "../../components/popups/activity/teacher-create-activity";
import { ActivityCard } from "../../components/Cards/Card.Activity";
import { useFetchTeams } from "../../hooks/useTeam";
import { useNavigate } from "react-router-dom";
import { useFetchCourses } from "../../hooks/useCourse";
import {
	useGetActivityByTeam,
	useFetchActivities,
	useGetActivitiesByClass,
} from "../../hooks/useActivity";
import { useFetchClasses } from "../../hooks/useClass";
import { ClassCard } from "../../components/Cards/Card.Class";
import { FiChevronLeft } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setStudentModel,selectCurrentTeam, selectStudentModel } from "../../features/slice/studentModelSlice"; // Import the student model slice
import { loadFromLocalStorage } from "../../components/utils/utils";

export const Student_ActivitySection = () => {
	const [teams, setTeams] = useState([]);
	const [unfilteredActivities, setUnfilteredActivities] = useState([]);
	const [selectedActivity, setSelectedActivity] = useState(null);

	const fetchedTeams = useFetchTeams();
	const fetchedClasses = useFetchClasses();
	const { fetchActivitiesByClass } = useGetActivitiesByClass();

	const courses = useFetchCourses();
	const [selectedTeam, setSelectedTeam] = useState(null);
	const [selectedCourse, setSelectedCourse] = useState("All");
	const [searchInput, setSearchInput] = useState("");
	const [showActivity, setShowActivity] = useState(false);
	const navigate = useNavigate();

	const dispatch = useDispatch();
	// Load the student model data when the component mounts
	useEffect(() => {
		const savedStudentModel = loadFromLocalStorage('studentModel');
		if (savedStudentModel) {
		  // Dispatch an action to set the loaded data into Redux state
		  dispatch(setStudentModel(savedStudentModel));
		}
	  }, []);

	const team_id = useSelector(selectCurrentTeam);
	console.log(team_id);
	const teamactivity = useGetActivityByTeam(team_id);
	console.log(teamactivity);

	// this gets all the activities unfiltered
	const getAllActivities = useFetchActivities();
	const [activities, setActivities] = useState(useFetchActivities());

	// classes is the state where all the classes are stored
	const [classes, setClasses] = useState([]);
	const [selectedClass, setSelectedClass] = useState(null);

	const handleToSelectedActivity = (activity) => {
		setSelectedActivity(activity);
		setShowActivity(true);
	};

	const handleToBack = () => {
		setSelectedClass(null);
		setSelectedTeam(null);

		setActivitiesAndUnfiltered(getAllActivities);
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
							Team: 0101 Promax
						</label>
					</div>
				</div>

				<div className='d-flex flex-column gap-3'>
					{teamactivity && (
						<>
							<div className='row'>
								<span
									className='nav-item nav-link col-md-1 m-0'
									onClick={() => handleToBack()}
								>
									<FiChevronLeft />
								</span>
								<button
									className='btn btn-white bw-3 m-0 col-md-3'
									onClick={() => handleFilterActivities(0)}
								>
									All
								</button>
								<button
									className='btn btn-white bw-3 m-0 col-md-3'
									onClick={() => handleFilterActivities(1)}
								>
									Submitted
								</button>
								<button
									className='btn btn-white bw-3 m-0 col-md-3'
									onClick={() => handleFilterActivities(2)}
								>
									Unsubmitted
								</button>
							</div>
							{teamactivity.map((activity, index) => (
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
