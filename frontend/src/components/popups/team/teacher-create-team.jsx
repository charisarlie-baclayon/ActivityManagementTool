import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useCreateTeam } from "../../../hooks/useTeam";
import { useFetchClasses } from "../../../hooks/useClass"; // Import the hook for fetching classes

export const CreateTeamPopup = ({ show, handleClose }) => {
	const createNewTeam = useCreateTeam();
	const classes = useFetchClasses(); // Fetch the list of classes

	const [teamData, setTeamData] = useState({
		name: "",
		team_class: "", // Use team_class to store the selected class ID
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTeamData({
			...teamData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await createNewTeam(teamData);

			await handleClose();
			window.location.reload();
		} catch (error) {
			console.error(error);
			// Handle error, e.g., show an error message to the user
		}
	};

	return (
		<Modal show={show} onHide={handleClose} size="lg" centered>
			<Modal.Header closeButton>
				<Modal.Title className="fs-6 fw-bold">Create Team</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form className="d-flex flex-column gap-3 ">
					<Form.Group controlId="name-input">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							name="name"
							value={teamData.name}
							onChange={handleChange}
						/>
					</Form.Group>

					<Form.Group controlId="class-dropdown">
						<Form.Label>Team Class</Form.Label>
						<Form.Control
							as="select"
							name="team_class"
							value={teamData.team_class}
							onChange={handleChange}
						>
							<option value="">Select a class</option>
							{classes.map((classItem) => (
								<option key={classItem.id} value={classItem.id}>
									{classItem.name}
								</option>
							))}
						</Form.Control>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<button
					className="btn btn-outline-secondary btn-block fw-bold"
					onClick={handleClose}
				>
					Close
				</button>
				<button
					className="btn btn-secondary btn-block fw-bold"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</Modal.Footer>
		</Modal>
	);
};
