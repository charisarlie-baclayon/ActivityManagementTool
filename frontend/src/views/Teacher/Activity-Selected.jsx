import { useNavigate, useParams } from 'react-router-dom';
import { FiChevronLeft, FiTrash } from 'react-icons/fi';
import { useAddEvaluationToActivity, useDeleteActivity, useDeleteEvaluationFromActivity, useFetchActivity, useUpdateActivity } from '../../hooks/useActivity';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from 'react';
import { useFetchCourses } from '../../hooks/useCourse';
import { useFetchTeams } from '../../hooks/useTeam';
import { useCreateComment, useDeleteComment, useFetchComments, useFetchCommentsForActivity } from '../../hooks/useComments';
import { useSelector } from 'react-redux';
import { selectCurrentId } from '../../features/auth/authSlice';

export const Teacher_SelectedActivitySection = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const [showAddEvaluationModal, setShowAddEvaluationModal] = useState(false);
	const handleCloseAddEvaluationModal = () => setShowAddEvaluationModal(false);
	const [showCommentModal, setShowCommentModal] = useState(false);
	const handleCloseCommentModal = () => setShowCommentModal(false);

	const [activityData, setActivityData] = useState(null);
	const teams = useFetchTeams();
	const courses = useFetchCourses();
	const fetchActivityData = useFetchActivity(id);
	const deleteActivity = useDeleteActivity();
	const updateActivity = useUpdateActivity();
	const addEvaluation = useAddEvaluationToActivity();
	const deleteEvaluation = useDeleteEvaluationFromActivity();
	const deleteComment = useDeleteComment();
	const comments = useFetchComments();
	const addComment = useCreateComment();

	useEffect(() => {
		if (fetchActivityData) {
			const temp = fetchActivityData;
			setActivityData(temp);
		}
	}, [fetchActivityData]);


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



	const handleAddEvaluation = async (e) => {
		e.preventDefault();

		// todo: add logic to handle adding evaluation

		try {
			const response = addEvaluation(updateActivityData);
			console.log("Evaluation added successfully!");
			handleCloseAddEvaluationModal();
			//navigate(0);
		} catch (error) {
			console.error(error);
		}
	};


	const handleDeleteEvaluation = async (e) => {
		e.preventDefault();

		// todo: add a modal to confirm deletion

		try {
			updateActivityData.evaluation = 0;
			//const response = deleteEvaluation(id);

			const response = addEvaluation(updateActivityData);
			navigate(0);
			console.log("Evaluation deleted successfully!");
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (activityData) {
			setUpdateActivityData({
				...activityData,
			});
		}
	}, [activityData, showModal]);


	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await updateActivity(id, updateActivityData);

			// must add a conditional statement to check if response is successful
			// like if status 200 then goods

			// if response is successfully updated, then:
			if (response) {
				setUpdateActivityData(updateActivityData);
				handleCloseModal();
				navigate(0);

				console.log("Successfully updated class!");
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
				console.log("Successfully deleted team!");
				navigate("/teacher/activities");
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
		console.log(updateActivityData)
	};

	// State variable and handler for updating comments
	const [updateComment, setUpdatedComment] = useState({
		comment: "",
		activity_id: 0,
		user_id: 0,
	});

	const user_id = useSelector(selectCurrentId);
	// Handle input changes in the comment form
	const handleCommentChange = (e) => {
		const { name, value } = e.target;
		updateComment.activity_id = id;
		updateComment.user_id = user_id;
		setUpdatedComment({
			...updateComment,
			[name]: value,
		});
		console.log(updateComment)
	};

	const handleCommentDelete = async (e, commentId) => {
		e.preventDefault();

		// todo: add a modal to confirm deletion
		console.log(e);
		try {
			const response = await deleteComment(commentId);

			if (response) {
				console.log("Successfully deleted comment!");
				navigate(0);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleCommentSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await addComment(updateComment);

			// must add a conditional statement to check if response is successful
			// like if status 200 then goods

			// if response is successfully updated, then:
			if (response) {
				console.log(response);
				handleCloseCommentModal();
				navigate(0);

				console.log("Successfully added comment!");
			}
		} catch (error) {
			console.error(error);
		}
	};
	const fetchCommentsForActivity = useFetchCommentsForActivity();
	const [activityComments, setActivityComments] = useState([]);
	useEffect(() => {
		if (activityData) {
			setUpdateActivityData({
				...activityData,
			});

			const commentsForActivity = fetchCommentsForActivity(activityData.id);
			commentsForActivity.then((comments) => {
				setActivityComments(comments);
			}).catch((error) => {
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
				</div>
				<div className='d-flex flex-row gap-3'>
					<button className='btn btn-success bw-3' onClick={() => setShowAddEvaluationModal(true)}>Add Evaluation</button>
					{updateActivityData.submission_status && (
						<button
							className="btn btn-outline-secondary bw-3"
							onClick={handleDeleteEvaluation}
						>
							Delete Evaluation
						</button>
					)}
				</div>
				<hr className='text-dark' />
				<div className='d-flex flex-column gap-3'>
					<p>Comment</p>
					{(activityComments && activityComments.length > 0) ? (
						activityComments.map(comment => (
							<div className='d-flex flex-row justify-content-between p-3 border border-dark rounded-3 '>
								<p key={comment.id}>{comment.user} - {comment.comment}</p>
								<span className="nav-item nav-link text-danger " onClick={(e) => handleCommentDelete(e, comment.id)}>
									<FiTrash />
								</span></div>
						))
					) : (
						<p>No comments available</p>
					)}
					<button className='btn btn-outline-secondary bw-3' onClick={() => setShowCommentModal(true)}>Add Comment</button>
				</div>
			</div>
			<Modal show={showModal} onHide={handleCloseModal} size='lg' centered>
				<Modal.Header closeButton>
					<Modal.Title className='fs-6 fw-bold'>Update Activity</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className='d-flex flex-column gap-3'>
						<Form.Group controlId='title-input'>
							<Form.Label>Title</Form.Label>
							<Form.Control
								type='text'
								name='title'
								value={updateActivityData?.title}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId='description-input'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								as='textarea'
								rows={3}
								name='description'
								value={updateActivityData?.description}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId='course-input'>
							<Form.Label>Course</Form.Label>
							<Form.Select
								name='course_id'
								value={updateActivityData?.course_id}
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
								value={updateActivityData?.team_id}
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
								value={updateActivityData?.year_level}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId='section-input'>
							<Form.Label>Section</Form.Label>
							<Form.Control
								type='text'
								name='section'
								value={updateActivityData?.section}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId='submission-status-input'>
							<Form.Label>Submission Status</Form.Label>
							<Form.Select
								name='submission_status'
								value={updateActivityData?.submission_status}
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
								value={updateActivityData?.due_date}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId='evaluation-input'>
							<Form.Label>Evaluation</Form.Label>
							<Form.Control
								type='number'
								name='evaluation'
								value={updateActivityData?.evaluation}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId='total-score-input'>
							<Form.Label>Total Score</Form.Label>
							<Form.Control
								type='number'
								name='total_score'
								value={updateActivityData?.total_score}
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

			<Modal show={showAddEvaluationModal} onHide={handleCloseAddEvaluationModal} size="lg" centered>
				<Modal.Header closeButton>
					<Modal.Title className="fs-6 fw-bold">Add Evaluation</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className="d-flex flex-column gap-3">
						<Form.Group controlId="evaluation-input">
							<Form.Label>Evaluation</Form.Label>
							<Form.Control
								type="number"
								name="evaluation"
								value={updateActivityData?.evaluation}
								onChange={handleChange}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary" onClick={handleCloseAddEvaluationModal}>
						Close
					</Button>
					<Button variant="success" onClick={handleAddEvaluation}>
						Add Evaluation
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={showCommentModal} onHide={handleCloseCommentModal} centered>
				<Modal.Header closeButton>
					<Modal.Title className="fs-6 fw-bold">Add Comment</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className="d-flex flex-column gap-3">
						<Form.Group controlId="comment-input">
							<Form.Label>Comment</Form.Label>
							<Form.Control
								name='comment'
								as="textarea"
								rows={3}
								onChange={handleCommentChange}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary" onClick={handleCloseCommentModal}>
						Close
					</Button>
					<Button variant="success" onClick={handleCommentSubmit}>
						Add Comment
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};