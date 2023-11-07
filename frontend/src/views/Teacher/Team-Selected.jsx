import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	useFetchTeam,
	useUpdateTeam,
	useDeleteTeam,
} from "../../hooks/useTeam";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

export const Teacher_SelectedTeamSection = () => {
	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const navigate = useNavigate();

	const { id } = useParams();
	const updateTeam = useUpdateTeam();
	const deleteTeam = useDeleteTeam();
	const [teamData, setTeamData] = useState(null);
	const fetchedTeamData = useFetchTeam(id);

	const [updateTeamData, setUpdateTeamData] = useState({
		id: "",
		name: "",
		team_class: "",
	});

	useEffect(() => {
		if (fetchedTeamData) {
			setTeamData(fetchedTeamData);
		}
	}, [fetchedTeamData]);

	useEffect(() => {
		if (teamData) {
			setUpdateTeamData({
				...teamData,
			});
		}
	}, [teamData, showModal]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUpdateTeamData({
			...updateTeamData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await updateTeam(id, updateTeamData);

			// must add a conditional statement to check if response is successful
			// like if status 200 then goods

			if (response) {
				setTeamData(updateTeamData);
				handleCloseModal();

				console.log("Successfully updated team!");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleEdit = (e) => {
		e.preventDefault();
		setShowModal(true);
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		console.log("Delete");

		try {
			const response = await deleteTeam(id);

			if (response) {
				console.log("Successfully deleted team!");
				navigate("/teacher/teams");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='container-md'>
			<div className='container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3'>
				<div className='d-flex flex-row justify-content-between'>
					<div className="d-flex flex-row align-items-center gap-3">
						<span className="nav-item nav-link" onClick={() => { history.back() }}>
							<FiChevronLeft />
						</span>
						<h4 className="fw-bold m-0">{teamData ? `Team - ${teamData.name}` : "Loading..."}</h4>
					</div>
					<div className="d-flex flex-row gap-3 ">
						<button
							className='btn btn-outline-secondary btn-block fw-bold bw-3 m-0 '
							onClick={handleEdit}
						>
							Edit Team
						</button>
						<button
							className='btn btn-danger btn-block fw-bold bw-3 m-0 '
							onClick={handleDelete}
						>
							Delete Team
						</button>
					</div>
				</div>
				<hr className='text-dark' />
				<div>
					{teamData ? (
						<div>
							<p>Id: {teamData.id}</p>
							<p>Name: {teamData.name}</p>
							<p>Team Class: {teamData.team_class}</p>
						</div>
					) : (
						<p>Loading team details...</p>
					)}
				</div>
			</div>

			<Modal size='lg' centered show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title className='fs-6 fw-bold'>Edit Team</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className='d-flex flex-column gap-3 '>
						<Form.Group controlId='name-input'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								name='name'
								value={updateTeamData?.name}
								onChange={handleChange}
							/>
						</Form.Group>

						<Form.Group controlId='name-input'>
							<Form.Label>Team Class</Form.Label>
							<Form.Control
								type='text'
								name='team_class'
								value={updateTeamData?.team_class}
								onChange={handleChange}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<button
						className='btn btn-outline-secondary btn-block fw-bold'
						onClick={handleCloseModal}
					>
						Close
					</button>
					<button
						className='btn btn-secondary btn-block fw-bold'
						onClick={handleSubmit}
					>
						Edit
					</button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};
