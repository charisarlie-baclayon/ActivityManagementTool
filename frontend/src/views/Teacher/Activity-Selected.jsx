import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
	FiChevronLeft,
	FiTrash
} from "react-icons/fi";

import {
	useDeleteActivity,
	useDeleteEvaluationFromActivity,
	useFetchActivity,
} from "../../hooks/useActivity";

import {
	useDeleteComment,
	useFetchCommentsForActivity,
} from "../../hooks/useComments";

import { UpdateActivityPopup } from "../../components/popups/activity/teacher-update-activity";
import { CreateCommentPopup } from "../../components/popups/comment/teacher-create-comment";
import { CreateEvaluationPopup } from "../../components/popups/evaluation/teacher-create-evaluation";

import { WorkCard } from '../../components/Cards/Card.Work';
import { useCreateWork, useFetchWorksByActivity } from '../../hooks/useWork';

export const Teacher_SelectedActivitySection = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const handleCloseUpdateModal = () => setShowUpdateModal(false);
	const [showAddEvaluationModal, setShowAddEvaluationModal] = useState(false);
	const handleCloseAddEvaluationModal = () => setShowAddEvaluationModal(false);
	const [showCommentModal, setShowCommentModal] = useState(false);
	const handleCloseCommentModal = () => setShowCommentModal(false);

	const [activityData, setActivityData] = useState(null);
	const fetchActivityData = useFetchActivity(id);
	const deleteActivity = useDeleteActivity();
	const deleteComment = useDeleteComment();
	const deleteEvaluation = useDeleteEvaluationFromActivity();

	const [workData, setWorkData] = useState(null);
	const fetchWorkData = useFetchWorksByActivity(id);

	useEffect(() => {
		if (fetchWorkData) {
			setWorkData(fetchWorkData);
		}
	}, [fetchWorkData]);
	console.log(fetchWorkData);

	useEffect(() => {
		if (fetchActivityData) {
			const temp = { ...fetchActivityData };
			setActivityData(temp);
		}
	}, [fetchActivityData]);

	const handleDeleteEvaluation = async (e) => {
		e.preventDefault();

		// Display a confirmation dialog
		const isConfirmed = window.confirm("Are you sure you want to delete this evaluation?");

		if (isConfirmed) {
			try {
				const response = deleteEvaluation(id);

				navigate(0);
				console.log("Evaluation deleted successfully!");
			} catch (error) {
				console.error(error);
			}
		}
		else {
			// The user canceled the deletion
			console.log("Deletion canceled");
		}
	};

	const handleDelete = async (e) => {
		e.preventDefault();

		// Display a confirmation dialog
		const isConfirmed = window.confirm("Are you sure you want to delete this activity?");

		if (isConfirmed) {
			try {
				const response = await deleteActivity(id);

				if (response) {
					console.log("Successfully deleted team!");
					navigate("/teacher/activities");
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			// The user canceled the deletion
			console.log("Deletion canceled");
		}
	};

	const handleEdit = (e) => {
		console.log(activityData);
		e.preventDefault();
		setShowUpdateModal(true);
	};

	const handleCommentDelete = async (e, commentId) => {
		e.preventDefault();
		// Display a confirmation dialog
		const isConfirmed = window.confirm("Are you sure you want to delete this comment?");

		if (isConfirmed) {
			try {
				const response = await deleteComment(commentId);

				if (response) {
					console.log("Successfully deleted comment!");
					navigate(0);
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			// The user canceled the deletion
			console.log("Deletion canceled");
		}
	};

	const fetchCommentsForActivity = useFetchCommentsForActivity();
	const [activityComments, setActivityComments] = useState([]);
	useEffect(() => {
		if (activityData) {
			const commentsForActivity = fetchCommentsForActivity(activityData.id);
			commentsForActivity
				.then((comments) => {
					setActivityComments(comments);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [activityData]);

	const getFormattedDate = () => {
		if (activityData?.due_date) {
			const options = {
				year: "numeric",
				month: "long",
				day: "numeric",
			};
			const date = new Date(activityData.due_date);
			return date.toLocaleDateString(undefined, options);
		} else {
			return "None";
		}
	};

	return (
		<div className='container-md'>
			<div className='container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3'>
				<div className='d-flex flex-row justify-content-between'>
					<div className='d-flex flex-row align-items-center gap-3'>
						<span
							className='nav-item nav-link'
							onClick={() => {
								navigate(-1);
							}}
						>
							<FiChevronLeft />
						</span>

						<h4 className='fw-bold m-0'>
							{activityData ? `Activity - ${activityData.title}` : "Loading..."}
						</h4>
					</div>

					<div className='d-flex flex-row gap-3 '>
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

				<hr className='text-dark' />

				<div>
					{activityData ? (
						<div className="d-flex flex-row justify-content-between ">
							<div>
								<p>Due - {getFormattedDate()}</p>
								<p>Description:</p>
								<div dangerouslySetInnerHTML={{ __html: activityData?.description.replace(/\n/g, "<br>") }} />
							</div>
							<div>
								<p>
									Evaluation: {activityData?.evaluation ?? 0} /{" "}
									{activityData.total_score}
								</p>
							</div>
						</div>
					) : (
						<p>Loading class details...</p>
					)}
				</div>

				<div className='d-flex flex-row gap-3'>
					<button
						className='btn btn-success bw-3'
						onClick={() => setShowAddEvaluationModal(true)}
						disabled={!activityData?.submission_status}
					>
						Add Evaluation
					</button>

					{activityData?.submission_status && (
						<button
							className='btn btn-outline-secondary bw-3'
							onClick={handleDeleteEvaluation}
						>
							Delete Evaluation
						</button>
					)}
				</div>
				
				<div className="d-flex flex-column gap-3">
					<h5 className="fw-bold">Works</h5>
					{workData && workData.length > 0 ? (
						workData.map((work) => (
							<WorkCard 
								key={work.id} 
								workData={work} 
							/>
						))
					) : (
						<p>No work data available.</p>
					)}
				</div>

				<hr className='text-dark' />
				
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

					<button
						className='btn btn-outline-secondary bw-3'
						onClick={() => setShowCommentModal(true)}
					>
						Add Comment
					</button>
				</div>
			</div>

			{activityData ? (
				<UpdateActivityPopup
					show={showUpdateModal}
					handleClose={handleCloseUpdateModal}
					data={activityData}
				/>
			) : (
				<p>Loading data...</p>
			)}

			{activityData ? (

				<CreateCommentPopup
					show={showCommentModal}
					handleClose={handleCloseCommentModal}
					data={activityData}
				/>
			) : (
				<p>Loading data...</p>
			)}
			{activityData ? (
				<CreateEvaluationPopup
					show={showAddEvaluationModal}
					handleClose={handleCloseAddEvaluationModal}
					data={activityData}
				/>
			) : (
				<p>Loading data...</p>
			)}
		</div>
	);
};
