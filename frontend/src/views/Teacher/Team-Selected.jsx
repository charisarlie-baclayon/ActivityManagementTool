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
import { FiChevronLeft, FiTrash } from "react-icons/fi";
import AssignStudentTeamPopup from "../../components/popups/team/student-assign-team";
import { useFetchStudentsByTeam } from "../../hooks/useStudent";

export const Teacher_SelectedTeamSection = () => {
	const [showModal, setShowModal] = useState(false);
	const [showAssignStudentPopup, setShowAssignStudentPopup] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const handleCloseAssignStudentPopup = () => setShowAssignStudentPopup(false); 	
	const navigate = useNavigate();

	const { id } = useParams();
	const updateTeam = useUpdateTeam();
	const deleteTeam = useDeleteTeam();
	const fetchedStudentData = useFetchStudentsByTeam(id);
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
		if (fetchedStudentData) {
			setTeamData(fetchedStudentData);
			console.log(fetchedStudentData);
		}
	}, [fetchedStudentData]);

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

		// Check if any of the required fields are empty
		const requiredFields = ['name', 'team_class'];
		const isEmptyField = requiredFields.some((field) => !updateTeamData[field]);

		if (isEmptyField) {
			window.alert('Please fill in all required fields.');
			return;
		}

		try {
			const response = await updateTeam(id, updateTeamData);

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
		// Display a confirmation dialog
		const isConfirmed = window.confirm("Are you sure you want to delete this team?");

		if (isConfirmed) {
			try {
				const response = await deleteTeam(id);

				if (response) {
					console.log("Successfully deleted team!");
					navigate("/teacher/teams");
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			// The user canceled the deletion
			console.log("Deletion canceled");
		}
	};

	
	const handleAddMember = (e) => {
		e.preventDefault();
		setShowAssignStudentPopup(true);
	};

	return (
		<div className='container-md'>
			<div className='container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3'>
				<div className='d-flex flex-row justify-content-between'>
					<div className="d-flex flex-row align-items-center gap-3">
						<span className="nav-item nav-link" onClick={() => { navigate(-1) }}>
							<FiChevronLeft />
						</span>
						<h4 className="fw-bold m-0">{teamData ? `Team - ${teamData.name}` : "Loading..."}</h4>
					</div>
					<div className="d-flex flex-row gap-3 ">
						<button
							className="btn btn-outline-secondary btn-block fw-bold bw-3 m-0 "
							onClick={handleAddMember}
						>
						Add Member
						</button>
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
				
				<hr className='text-dark' />
				<div className="d-flex flex-column gap-3">
				{fetchedStudentData && fetchedStudentData.length > 0 ? (
					fetchedStudentData.map((student) => (
						<div className='d-flex flex-row justify-content-between p-3 border border-dark rounded-3' key={student.id}>
							<p>
								{`${'Id: ' + student.id + ' - '} ${ student.user.first_name} ${student.user.last_name} - ${student.user.email}`}
							</p>
						</div>
					))
					) : (
					<p>No students available</p>
					)}
				</div>
			</div>
			
			<AssignStudentTeamPopup
				show={showAssignStudentPopup}
				handleClose={handleCloseAssignStudentPopup}
				// Replace assignStudentToTeam with the actual function that assigns a student to a team
				teamId={id}
			/>

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
