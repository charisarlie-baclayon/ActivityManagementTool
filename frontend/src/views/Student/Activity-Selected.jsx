import { useNavigate, useParams } from 'react-router-dom';
import { useFetchClass } from '../../hooks/useClass';
import { FiChevronLeft, FiTrash } from 'react-icons/fi';
import { useSubmitActivity, useDeleteActivity, useFetchActivity } from '../../hooks/useActivity';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from 'react';
import { useFetchCourses } from '../../hooks/useCourse';
import { useFetchTeams } from '../../hooks/useTeam';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setStudentModel, selectCurrentTeam, selectStudentModel } from "../../features/slice/studentModelSlice"; // Import the student model slice
import { loadFromLocalStorage } from "../../components/utils/utils";
import { WorkPopup } from "../../components/popups/activity/student-view-work";
import { useCreateWork, useFetchWorksByActivity } from '../../hooks/useWork';
import { WorkCard } from '../../components/Cards/Card.Work';
import { selectCurrentId } from '../../features/auth/authSlice';
import { useCreateComment, useDeleteComment, useFetchComments, useFetchCommentsForActivity } from '../../hooks/useComments';

export const Student_SelectedActivitySection = () => {

	const dispatch = useDispatch();
	// Load the student model data when the component mounts
	useEffect(() => {
		const savedStudentModel = loadFromLocalStorage('studentModel');
		if (savedStudentModel) {
			// Dispatch an action to set the loaded data into Redux state
			dispatch(setStudentModel(savedStudentModel));
		}
	}, []);

	const { id } = useParams();
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);

	const [activityData, setActivityData] = useState(null);
	const [workData, setWorkData] = useState(null);
	const teams = useFetchTeams();
	const courses = useFetchCourses();
	const fetchActivityData = useFetchActivity(id);
	const deleteActivity = useDeleteActivity();
	const submitActivity = useSubmitActivity();
	const fetchWorkData = useFetchWorksByActivity(id);
	const createWork = useCreateWork();

	useEffect(() => {
		if (fetchActivityData) {
			setActivityData(fetchActivityData);
		}
	}, [fetchActivityData]);

	useEffect(() => {
		if (fetchWorkData) {
			setWorkData(fetchWorkData);
		}
	}, [fetchWorkData]);
	console.log(workData);

	const [updateActivityData, setUpdateActivityData] = useState({
		title: "",
		description: "",
		course_id: "",
		team_id: "",
		year_level: "",
		section: "",
		submission_status: false,
		due_date: null,
		evaluation: null,
		total_score: 100,
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = submitActivity(id);

			if (response) {
				console.log("Successfully submitted activity!");
				navigate("/student/activities");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async (e) => {
		e.preventDefault();

		// todo: add a modal to confirm deletion

		try {
			const response = await deleteActivity(id);

			if (response) {
				console.log("Successfully deleted activity!");
				navigate("/student/activities");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleEdit = (e) => {
		console.log(activityData);
		e.preventDefault();
		setShowModal(true);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUpdateActivityData({
			...updateActivityData,
			[name]: value,
		});
	};

	const fetchCommentsForActivity = useFetchCommentsForActivity();
	const [activityComments, setActivityComments] = useState([]);
	useEffect(() => {
		if (activityData) {
			setUpdateActivityData({
				...activityData,
			});

			const commentsForActivity = fetchCommentsForActivity(activityData.id);
			commentsForActivity
				.then((comments) => {
					setActivityComments(comments);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [activityData, showModal]);

	return (
		<div className="container-md">
			<div className="container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3">
				<div className="d-flex flex-row justify-content-between">
					<div className="d-flex flex-row align-items-center gap-3">
						<span className="nav-item nav-link" onClick={() => { navigate(-1) }}>
							<FiChevronLeft />
						</span>
						<h4 className='fw-bold m-0'>{activityData ? `Activity - ${activityData.title}` : "Loading..."}</h4>
					</div>
					<div className="d-flex flex-row gap-3 ">
						<button
							className='btn btn-outline-secondary btn-block fw-bold bw-3 m-0 '
							onClick={handleEdit}
						>
							Edit Activity
						</button>
						<button
							className='btn btn-danger btn-block fw-bold bw-3 m-0 '
							onClick={handleDelete}
						>
							Delete Activity
						</button>
						<button
							className='btn btn-outline-secondary btn-block fw-bold bw-3 m-0 '
							onClick={handleSubmit}
						>
							Submit Activity
						</button>
					</div>
				</div>
				<hr className="text-dark" />
				<div>
					{activityData ? (
						<div>
							<p>Name: {activityData.title}</p>
							<p>Description: {activityData.description}</p>
							<p>Due Date: {activityData.due_date}</p>
							<p>Evaluation: {activityData.evaluation} / {activityData.total_score}</p>
						</div>
					) : (
						<p>Loading class details...</p>
					)}

					<div className="d-flex flex-column gap-3">
						<h5 className="fw-bold">Works</h5>
						{workData ? (
						workData.map((work) => (
							<WorkCard key={work.id} workData={work} />
						))
						) : (
						<p>No work data available.</p>
						)}
					</div>

				</div>
				<div className='d-flex flex-row gap-3'>
					<button className='btn btn-success bw-3' onClick={handleAddWork}>
						Add Work
					</button>
				</div>
				<hr className='text-dark' />

				{activityData && (
					<WorkPopup
					show={showAddWorkModal}
					handleClose={() => setShowAddWorkModal(false)}
					workData={workData} // Pass any necessary data
					id={id}
					//onSubmit={handleSubmitWork} // Define a function to handle work submission
					/>
				)}

				<div className='d-flex flex-column gap-3'>
					<p>Comment</p>
					{activityComments && activityComments.length > 0 ? (
						activityComments.map((comment) => (
							<div className='d-flex flex-row justify-content-between p-3 border border-dark rounded-3 '>
								<p key={comment.id}>
									{comment.user} - {comment.comment}
								</p>
							</div>
						))
					) : (
						<p>No comments available</p>
					)}
				</div>
			</div>
		</div>
	);
};