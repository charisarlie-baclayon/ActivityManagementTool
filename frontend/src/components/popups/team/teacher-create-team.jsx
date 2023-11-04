import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useCreateTeam } from "../../../hooks/useTeam";

export const CreateTeamPopup = ({ show, handleClose }) => {
	const createNewTeam = useCreateTeam();

	const [teamData, setTeamData] = useState({
		name: "",
		team_class: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTeamData({
			...teamData,
			[name]: value,
		});
	};

	const handleSubmit = async () => {
		try {
			await createNewTeam(teamData);
			await handleClose();

			if (
				window.confirm(
					"Created Successfully. Click 'Okay' to refresh the page."
				)
			) {
				//window.location.reload(); //bati mani
			}
		} catch (error) {
			console.error(error);
			// Handle error, e.g., show an error message to the user
		}
	};

	return (
		<Modal show={show} onHide={handleClose} size='lg' centered>
			<Modal.Header closeButton>
				<Modal.Title className='fs-6 fw-bold'>Create Team</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form className='d-flex flex-column gap-3 '>
					<Form.Group controlId='name-input'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							name='name'
							value={teamData.name}
							onChange={handleChange}
						/>
					</Form.Group>

					<Form.Group controlId='name-input'>
						<Form.Label>Team Class</Form.Label>
						<Form.Control
							type='text'
							name='team_class'
							value={teamData.team_class}
							onChange={handleChange}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<button
					className='btn btn-outline-secondary btn-block fw-bold'
					onClick={handleClose}
				>
					Close
				</button>
				<button
					className='btn btn-secondary btn-block fw-bold'
					onClick={handleSubmit}
				>
					Submit
				</button>
			</Modal.Footer>
		</Modal>
	);
};
