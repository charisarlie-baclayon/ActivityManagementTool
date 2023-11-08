import { useEffect, useState } from "react";
import { ActivityPopup } from "../../components/popups/activity/teacher-view-activity";
import { CreateActivityPopup } from "../../components/popups/activity/teacher-create-activity";
import { ActivityCard } from "../../components/Cards/Card.Activity";
import { useFetchTeams } from "../../hooks/useTeam";
import { useNavigate } from "react-router-dom";
import { useFetchCourses } from "../../hooks/useCourse";
import {
	useFetchActivities,
	useGetActivitiesByClass,
} from "../../hooks/useActivity";
import { useFetchClasses } from "../../hooks/useClass";
import { ClassCard } from "../../components/Cards/Card.Class";
import { FiChevronLeft } from "react-icons/fi";

export const Teacher_ActivitySection = () => {
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

	// this gets all the activities unfiltered
	const getAllActivities = useFetchActivities();
	const [activities, setActivities] = useState(useFetchActivities());

	// classes is the state where all the classes are stored
	const [classes, setClasses] = useState([]);
	const [selectedClass, setSelectedClass] = useState(null);

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

	// sets the classes once the fetched classes is done fetching
	useEffect(() => {
		setClasses(fetchedClasses);
	}, [fetchedClasses]);

	useEffect(() => {
		setTeams(fetchedTeams);
	}, [fetchedTeams]);

	useEffect(() => {
		setClasses(fetchedClasses);
	}, [fetchedClasses]);

	const setActivitiesAndUnfiltered = (activities) => {
		setActivities(activities);
		setUnfilteredActivities(activities);
	};

	const handleToSelectedActivity = (activity) => {
		setSelectedActivity(activity);
		setShowActivity(true);
	};

	const handleFilterActivities = (filter) => {
		let filteredActivities;

		switch (filter) {
			case 0:
				setActivities(unfilteredActivities);
				break;
			case 1:
				filteredActivities = unfilteredActivities.filter(
					(activity) => activity.submission_status === true
				);
				setActivities(filteredActivities);
				break;
			case 2:
				filteredActivities = unfilteredActivities.filter(
					(activity) => activity.submission_status === false
				);
				setActivities(filteredActivities);
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

			// Find the class of the selected team
			const teamClass = fetchedClasses.find((classItem) =>
				classItem.teams.some((team) => team.id == teamId)
			);

			if (teamClass) {
				setSelectedCourse(teamClass.course.id);
			}

			// Filter the teams based on the selected course
			// COMMENT THIS IF YOU STILL WANT TO DISPLAY ALL THE TEAMS, IF A TEAM IS SELECTED
			const filteredClasses = fetchedClasses.filter(
				(classItem) => classItem.course.id == teamClass.course.id
			);
			const filteredTeams = filteredClasses.flatMap(
				(classItem) => classItem.teams
			);
			setTeams(filteredTeams);

			// end comment

			setSelectedClass(teamClass.id);

			const filteredActivities = getAllActivities.filter(
				(activity) => activity.activity_team == teamId
			);

			setActivitiesAndUnfiltered(filteredActivities);
		}
	};

	const handleCourseChange = async (courseId) => {
		if (courseId === "All") {
			setSelectedCourse("All");

			// set classes will be null because nothing is selected
			setSelectedClass(null);
			setClasses(fetchedClasses);

			// Display all teams from all classes
			setTeams(fetchedTeams);
			setSelectedTeam("All");
			// Display all activities
			setActivitiesAndUnfiltered([]);
		} else {
			// add filter to teams depending on	the course selected
			// 1st step: get all the teams
			// 2nd step: filter the teams by the classes shown, because there is get teams by course
			// 3rd step: set the teams to the filtered teams
			// 4th step: set activities to the activities of the selected course
			setSelectedCourse(courseId);

			const filteredClasses = fetchedClasses.filter(
				(classItem) => classItem.course.id == courseId
			);
			setClasses(filteredClasses);

			const filteredTeams = filteredClasses.flatMap(
				(classItem) => classItem.teams
			);
			setTeams(filteredTeams);

			// cannot directly filter the activities because there is no field in the
			// activity that shows the course
			const filteredActivities = getAllActivities.filter((activity) =>
				filteredTeams.some((team) => team.id == activity.activity_team)
			);
			setActivitiesAndUnfiltered(filteredActivities);
		}
	};

	const handleToBack = () => {
		setSelectedClass(null);
		setSelectedTeam(null);

		// set team will be the teams base on the selected course
		const filteredTeams = fetchedClasses.reduce((teams, classItem) => {
			if (classItem.course.id == selectedCourse) {
				teams.push(...classItem.teams);
			}
			return teams;
		}, []);
		setTeams(filteredTeams);

		setActivitiesAndUnfiltered(getAllActivities);
	};

	const navigateToClass = (id) => {
		setSelectedClass(id);

		fetchActivitiesByClass(id).then((activities) => {
			setActivitiesAndUnfiltered(activities);
		});

		const classItem = fetchedClasses.find((classItem) => classItem.id == id);
		setTeams(classItem.teams);

		// this will set the course to the course of the class
		setSelectedCourse(classItem.course.id);
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
					{selectedClass && activities && (
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

					{!selectedClass && (
						<div className='row'>
							{Array.isArray(classes) &&
								classes.map((classItem) => (
									<div key={classItem.id} className='col-md-3 mb-3'>
										<ClassCard
											classData={classItem}
											onClick={() => navigateToClass(classItem.id)}
										/>
									</div>
								))}
						</div>
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
