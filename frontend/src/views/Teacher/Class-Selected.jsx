import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	useFetchClass,
	useUpdateClass,
	useDeleteClass,
} from "../../hooks/useClass";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

export const Teacher_SelectedClassSection = () => {
	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const navigate = useNavigate();

	const { id } = useParams();
	const updateClass = useUpdateClass();
	const deleteClass = useDeleteClass();
	const [classData, setClassData] = useState(null);
	const fetchClassData = useFetchClass(id);

	const [updateClassData, setUpdateClassData] = useState({
		id: "",
		name: "",
		course_name: "",
		year_level: "",
		section: "",
	});

	useEffect(() => {
		if (fetchClassData) {
			setClassData(fetchClassData);
		}
	}, [fetchClassData]);

	useEffect(() => {
		if (classData) {
			setUpdateClassData({
				...classData,
			});
		}
	}, [classData, showModal]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUpdateClassData({
			...updateClassData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await updateClass(id, updateClassData);

			// must add a conditional statement to check if response is successful
			// like if status 200 then goods

			// if response is successfully updated, then:
			if (response) {
				setClassData(updateClassData);
				handleCloseModal();

				console.log("Successfully updated class!");
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

		// todo: add a modal to confirm deletion

		try {
			const response = await deleteClass(id);

			if (response) {
				console.log("Successfully deleted team!");
				navigate("/teacher/classes");
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div className='container-md'>
			<div className='container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3'>
				<div className='d-flex flex-row justify-content-between'>
					<div className="d-flex flex-row align-items-center gap-2">
						<span className="nav-item nav-link" onClick={() => { navigate(-1) }}>
							<FiChevronLeft />
						</span>
						<h4 className="fw-bold m-0">{classData ? `Class - ${classData.name}` : "Loading..."}</h4>
					</div>
					<div className="d-flex flex-row gap-3 ">
						<button
							className='btn btn-outline-secondary btn-block fw-bold bw-3 m-0 '
							onClick={handleEdit}
						>
							Edit Class
						</button>
						<button
							className='btn btn-danger btn-block fw-bold bw-3 m-0 '
							onClick={handleDelete}
						>
							Delete Class
						</button>
					</div>
				</div>
				<hr className='text-dark' />
				<div>
					{classData ? (
						<div>
							<p>Course Name: {classData.course.name}</p>
							<p>Year Level: {classData.year_level}</p>
							<p>Section: {classData.section}</p>
							<p>Date Created: {classData.date_created}</p>
						</div>
					) : (
						<p>Loading class details...</p>
					)}
				</div>
			</div>
			<Modal show={showModal} onHide={handleCloseModal} size='lg' centered>
				<Modal.Header closeButton>
					<Modal.Title className='fs-6 fw-bold'>Create Class</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className='d-flex flex-column gap-3 '>
						<Form.Group controlId='name-input'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								name='name'
								value={updateClassData?.name}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId='course-name-input'>
							<Form.Label>Course Name</Form.Label>
							<Form.Control
								type='text'
								name='course_name'
								value={updateClassData?.course_name}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId='year-level-input'>
							<Form.Label>Year Level</Form.Label>
							<Form.Control
								type='number'
								name='year_level'
								value={updateClassData?.year_level}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId='section-input'>
							<Form.Label>Section</Form.Label>
							<Form.Control
								type='text'
								name='section'
								value={updateClassData?.section}
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
						Submit
					</button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};
