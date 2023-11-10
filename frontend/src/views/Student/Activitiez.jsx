import { useEffect, useState } from "react";
import { ActivityCard } from "../../components/Cards/Card.Activity";
import { useFetchTeams } from "../../hooks/useTeam";
import { useNavigate } from "react-router-dom";
import { useFetchCourses } from "../../hooks/useCourse";
import {
	useGetActivityByTeam,
	useFetchActivities,
	useGetActivitiesByClass,
	useGetSubmittedActivitiesByTeam
} from "../../hooks/useActivity";
import { ClassCard } from "../../components/Cards/Card.Class";
import { FiChevronLeft } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setStudentModel,selectCurrentTeam, selectStudentModel } from "../../features/slice/studentModelSlice"; // Import the student model slice
import { loadFromLocalStorage } from "../../components/utils/utils";

export const Student_ActivitySection = () => {

	const dispatch = useDispatch();
	// Load the student model data when the component mounts
	useEffect(() => {
		const savedStudentModel = loadFromLocalStorage('studentModel');
		if (savedStudentModel) {
		  // Dispatch an action to set the loaded data into Redux state
		  dispatch(setStudentModel(savedStudentModel));
		}
	  }, []);

	const [teams, setTeams] = useState([]);
	const [unfilteredActivities, setUnfilteredActivities] = useState([]);

	const fetchedTeams = useFetchTeams();
	const { fetchActivitiesByClass } = useGetActivitiesByClass();
	const [selectedFilter, setSelectedFilter] = useState(0);

	const courses = useFetchCourses();
	const [selectedTeam, setSelectedTeam] = useState(null);
	const [selectedCourse, setSelectedCourse] = useState("All");
	const [searchInput, setSearchInput] = useState("");
	const navigate = useNavigate();

	//fetch team id
	const team_id = useSelector(selectCurrentTeam);
	console.log(team_id);


	//fetch activity by team
	const fetchActivitiesByTeam = useGetActivityByTeam();

	// this gets all the activities unfiltered
	const getAllActivities = useFetchActivities();
	const [activities, setActivities] = useState(null);
	setActivities(fetchActivitiesByTeam(team_id));
	console.log(activities);

	// Create a map for quick lookup of team names by id
	const teamNameMap = new Map(teams.map((team) => [team.id, team.name]));

	// Group activities by activity_team
	const groupedActivities = activities.reduce((groups, activity) => {
		const key = activity.activity_team;
		if (!groups[key]) {
			groups[key] = [];
		}
		groups[key].push(activity);
		return groups;
	}, {});

	useEffect(() => {
		setTeams(fetchedTeams);
	}, [fetchedTeams]);

	const setActivitiesAndUnfiltered = (activities) => {
		setActivities(activities);
		setUnfilteredActivities(activities);
		console.log(activities);

	};

	const handleToSelectedActivity = (activity) => {
		navigate(`${activity.id}`);
		console.log(activity);
	};

	const handleFilterActivities = (filter) => {
		let filteredActivities;

		switch (filter) {
			case 0:
				setActivities(unfilteredActivities);
				setSelectedFilter(0)
				break;
			case 1:
				filteredActivities = unfilteredActivities.filter(
					(activity) => activity.submission_status === true
				);
				setActivities(filteredActivities);
				setSelectedFilter(1)
				break;
			case 2:
				filteredActivities = unfilteredActivities.filter(
					(activity) => activity.submission_status === false
				);
				setActivities(filteredActivities);
				setSelectedFilter(2)
				break;
		}

	};

	const handleTeamChange = (teamId) => {
		setSelectedTeam(teamId);

		// the id is passed
		// if a team is selected, then filter the activities by team
		// it will directly show the activities of the selected team
		// if the team is all, then show all the activities

		if (teamId == "All") {
			if (selectedClass) {
				fetchActivitiesByClass(selectedClass).then((activities) => {
					setActivitiesAndUnfiltered(activities);
				});
			} else {
				console.log("selected class is null");

				setActivitiesAndUnfiltered([]);
			}
		} else {
			// if a team is selected, then filter the activities by team
			// it will directly show the activities of the selected team
			// if the team is all, then show all the activities

			// first step: identify what course the team is in, by getting the class of the team
			// seconds step: identify the course by the class selected,
			// third step: move the dropdown to the course of the team
			setSelectedTeam(teamId);

			// end comment

			setSelectedClass(teamClass.id);

			const filteredActivities = getAllActivities.filter(
				(activity) => activity.activity_team == teamId
			);

			setActivitiesAndUnfiltered(filteredActivities);
		}
	};

	const handleToBack = () => {
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
						<label htmlFor='courseFilter' className='m-0'>
							Course:
						</label>
						<select
							id='courseFilter'
							className='form-select border-dark'
							onChange={(e) => handleCourseChange(e.target.value)}
							value={selectedCourse}
						>
							<option value='All'>All</option>
							{courses &&
								courses.map((courseItem) => (
									<option key={courseItem.id} value={courseItem.id}>
										{courseItem.name}
									</option>
								))}
						</select>
					</div>
					<div className='d-flex flex-row gap-3 align-items-center w-25'>
						<label htmlFor='teamFilter' className='m-0'>
							Team:
						</label>
						<select
							id='teamFilter'
							className='form-select border-dark'
							onChange={(e) => handleTeamChange(e.target.value)}
							value={selectedTeam}
						>
							<option value='All'>All</option>
							{teams &&
								teams.map((teamItem) => (
									<option key={teamItem.id} value={teamItem.id}>
										{teamItem.name}
									</option>
								))}
						</select>
					</div>
				</div>

				<div className='d-flex flex-column gap-3'>
					{activities && (
						<>
							<div className='row'>
								<span
									className='nav-item nav-link col-md-1 m-0'
									onClick={() => handleToBack()}
								>
									<FiChevronLeft />
								</span>
								<button
									className={`btn ${selectedFilter === 0 ? 'btn-secondary' : 'btn-white'} bw-3 m-0 col-md-3`}
									onClick={() => handleFilterActivities(0)}
								>
									All
								</button>
								<button
									className={`btn ${selectedFilter === 1 ? 'btn-secondary' : 'btn-white'} bw-3 m-0 col-md-3`}
									onClick={() => handleFilterActivities(1)}
								>
									Submitted
								</button>
								<button
									className={`btn ${selectedFilter === 2 ? 'btn-secondary' : 'btn-white'} bw-3 m-0 col-md-3`}
									onClick={() => handleFilterActivities(2)}
								>
									Unsubmitted
								</button>
							</div>
							{Object.entries(groupedActivities).map(([teamId, activities]) => (
								<div className='d-flex flex-column gap-3' key={teamId}>
									<p className='fw-bold m-0'>
										{teamNameMap.get(parseInt(teamId))}
									</p>
									{activities.map((act, index) => (
										<ActivityCard
											key={index}
											{...act}
											onClick={() => handleToSelectedActivity(act)}
										/>
									))}
								</div>
							))}
						</>
					)}
				</div>
			</div>
		</div>
	);
};
