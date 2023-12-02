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
import { EditWorkModal } from '../../components/popups/activity/student-edit-work';

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
	const [workData, setWorkData] = useState(null);
	const [activityData, setActivityData] = useState(null);
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
	console.log(fetchWorkData);


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

	const [showAddWorkModal, setShowAddWorkModal] = useState(false);

	const handleAddWork = async (e) => {
		setShowAddWorkModal(true);
	};

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

	//Edit/Delete Work

	//Edit Work
	const [editWorkData, setEditWorkData] = useState(null);
	const [showEditWorkModal, setShowEditWorkModal] = useState(false);
	const [selectedWorkId, setSelectedWorkId] = useState(null);
	const [selectedWork, setSelectedWork] = useState(null);
	const [isEditWorkClickable, setIsEditWorkClickable] = useState(false);

	//Select a work
	const handleSelectWork = (work) => {
		setSelectedWork(work);
		setSelectedWorkId(work.id);
	  };

	const handleEditWork = (work) => {
		if (work) {
			setEditWorkData(work); // Assuming setEditWorkData is a state updater function
			setSelectedWork(work);
			setSelectedWorkId(work.id); // Set the selected work ID
			setShowEditWorkModal(true);
		  }
	};

	// Function to handle submitting the edited work
	const handleEditWorkSubmit = async (editedWorkData) => {
		// Implement the logic to update the work data
		// You may need to use the appropriate hook or API call here
		console.log('Edited Work Data:', editedWorkData);
		setShowEditWorkModal(false);
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
								<WorkCard 
									key={work.id} 
									workData={work} 
									isClickable={!showEditWorkModal}
									onEditClick={() => handleSelectWork(work)}
									isSelected={selectedWork && selectedWork.id === work.id} // Check if the work is selected
								/>
							))
						) : (
							<p>No work data available.</p>
						)}
					</div>

				</div>
				<div className='d-flex flex-row gap-3'>
					<button className='btn btn-outline-secondary bw-3' onClick={handleAddWork}>
						Add Work
					</button>
					{selectedWork && (
						<button
						className="btn btn-primary bw-3"
						onClick={() => handleEditWork(selectedWork)}
						>
						Edit Work
						</button>
					)}
				</div>
				<hr className='text-dark' />

				{workData && (
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
							<div className='d-flex flex-row justify-content-between p-3 border border-dark rounded-3 ' key={comment.id}>
								<p>
									{comment.user.email} - {comment.comment}
								</p>
								<span
									className='nav-item nav-link text-danger'
									onClick={(e) => handleCommentDelete(e, comment.id)}
								>
									<FiTrash />
								</span>
							</div>
						))
					) : (
						<p>No comments available</p>
					)}
				</div>
			</div>

			{showEditWorkModal && (
				<EditWorkModal
					show={showEditWorkModal}
					handleClose={() => setShowEditWorkModal(false)}
					editWorkData={selectedWork}
					onSubmit={handleEditWorkSubmit}
					id={id}
					workId={selectedWorkId}
				/>
			)}
			

			<Modal show={showModal} onHide={handleCloseModal} size='lg' centered>
				<Modal.Header closeButton>
					<Modal.Title className='fs-6 fw-bold'>Create Activity</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className='d-flex flex-column gap-3'>
						<Form.Group controlId='title-input'>
							<Form.Label>Title</Form.Label>
							<Form.Control
								type='text'
								name='title'
								value={activityData?.title}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId='description-input'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								as='textarea'
								rows={3}
								name='description'
								value={activityData?.description}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId='course-input'>
							<Form.Label>Course</Form.Label>
							<Form.Select
								name='course_id'
								value={activityData?.course_id}
								onChange={handleChange}
							>
								<option value="">Select a course</option>
								{courses.map((course) => (
									<option key={course.id} value={course.id}>
										{course.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>
						<Form.Group controlId='team-input'>
							<Form.Label>Team</Form.Label>
							<Form.Select
								name='team_id'
								value={activityData?.team_id}
								onChange={handleChange}
							>
								<option value="">Select a team</option>
								{teams.map((team) => (
									<option key={team.id} value={team.id}>
										{team.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>
						<Form.Group controlId='year-level-input'>
							<Form.Label>Year Level</Form.Label>
							<Form.Control
								type='number'
								name='year_level'
								value={activityData?.year_level}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId='section-input'>
							<Form.Label>Section</Form.Label>
							<Form.Control
								type='text'
								name='section'
								value={activityData?.section}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId='submission-status-input'>
							<Form.Label>Submission Status</Form.Label>
							<Form.Select
								name='submission_status'
								value={activityData?.submission_status}
								onChange={handleChange}
							>
								<option value="false">Not Submitted</option>
								<option value="true">Submitted</option>
							</Form.Select>
						</Form.Group>
						<Form.Group controlId='due-date-input'>
							<Form.Label>Due Date</Form.Label>
							<Form.Control
								type='date'
								name='due_date'
								value={activityData?.due_date}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId='evaluation-input'>
							<Form.Label>Evaluation</Form.Label>
							<Form.Control
								type='number'
								name='evaluation'
								value={activityData?.evaluation}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId='total-score-input'>
							<Form.Label>Total Score</Form.Label>
							<Form.Control
								type='number'
								name='total_score'
								value={activityData?.total_score}
								onChange={handleChange}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='outline-secondary' onClick={handleCloseModal}>
						Close
					</Button>
					<Button variant='secondary' onClick={handleSubmit}>
						Update Activity
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};