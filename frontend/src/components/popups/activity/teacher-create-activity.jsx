import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useCreateActivity } from "../../../hooks/useActivity";
import { useFetchTeams } from "../../../hooks/useTeam"; // Import the useFetchTeams hook

export const CreateActivityPopup = ({ show, handleClose }) => {
	const createNewActivity = useCreateActivity();
	const teams = useFetchTeams(); // Fetch the list of teams

	const [activityData, setActivityData] = useState({
		title: "",
		description: "",
		link: "",
		due_date: "",
		evaluation: 0,
		total_score: 0,
		team_id: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setActivityData({
			...activityData,
			[name]: name === "description" ? value.replace(/\n/g, "<br>") : value
		});
	};

	const handleSubmit = async () => {
		// Check if any of the required fields are empty
		const requiredFields = ['title', 'description', "link", 'due_date', 'total_score', "team_id"];
		const isEmptyField = requiredFields.some((field) => !updateActivityData[field]);

		if (isEmptyField) {
			window.alert('Please fill in all required fields.');
			return;
		}

		try {
			await createNewActivity(activityData);
			handleClose();

			if (window.confirm("Created Successfully.")) {
				window.location.reload();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Modal show={show} onHide={handleClose} size="lg">
			<Modal.Header closebutton>
				<Modal.Title className="fs-6 fw-bold">Create Activity</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3" controlId="title-input">
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							name="title"
							value={activityData.title}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="description-input">
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							rows={8}
							name="description"
							value={activityData.description}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="link-input">
						<Form.Label>Link</Form.Label>
						<Form.Control
							type="text"
							name="link"
							value={activityData.link}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="due-date-input">
						<Form.Label>Due Date</Form.Label>
						<Form.Control
							type="datetime-local"
							name="due_date"
							value={activityData.due_date}
							onChange={handleChange}
						/>
					</Form.Group>
					{/*
					<Form.Group className="mb-3" controlId="evaluation-input">
						<Form.Label>Evaluation</Form.Label>
						<Form.Control
							type="number"
							name="evaluation"
							value={activityData.evaluation}
							onChange={handleChange}
						/>
					</Form.Group>
					*/}
					<Form.Group className="mb-3" controlId="total-score-input">
						<Form.Label>Total Score</Form.Label>
						<Form.Control
							type="number"
							name="total_score"
							value={activityData.total_score}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="team-select">
						<Form.Label>Select Team</Form.Label>
						<Form.Control
							as="select"
							name="team_id"
							value={activityData.team_id}
							onChange={handleChange}
						>
							<option value="">Select a Team</option>
							{teams &&
								teams.map((team) => (
									<option key={team.id} value={team.id}>
										{team.name}
									</option>
								))}
						</Form.Control>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<button
					className="btn btn-outline-secondary bw-3 btn-block fw-bold text-fs-5"
					onClick={handleClose}
				>
					Close
				</button>
				<button
					className="btn btn-secondary btn-block bw-3 fw-bold text-fs-5"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</Modal.Footer>
		</Modal>
	);
};
