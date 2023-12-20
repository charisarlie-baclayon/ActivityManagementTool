import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useCreateClass } from "../../../hooks/useClass";
import { useFetchCourses, useCreateCourse } from "../../../hooks/useCourse";
import { useNavigate } from "react-router-dom";

export const CreateClassPopup = ({ show, handleClose }) => {
	const navigate = useNavigate();
	const createNewClass = useCreateClass();
	const courses = useFetchCourses();

	const [classData, setClassData] = useState({
		name: "",
		course: "",
		year_level: "",
		section: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setClassData({
			...classData,
			[name]: value,
		});
	};

	const handleCourseChange = (e) => {
		const { value } = e.target;
		setClassData({
			...classData,
			course: value, // Rename course_id to course
		});
	};

	const handleSubmit = async () => {
		// Check if any of the required fields are empty
		const requiredFields = ['name', 'course', 'year_level', 'section'];
		const isEmptyField = requiredFields.some((field) => !classData[field]);

		if (isEmptyField) {
			window.alert('Please fill in all required fields.');
			return;
		}

		try {
			await createNewClass(classData);
			console.log(classData);
			navigate(0);
			handleClose();
		} catch (error) {
			console.error(error);
			// Handle error, e.g., show an error message to the user
		}
	};

	return (
		<Modal show={show} onHide={handleClose} size='lg' centered>
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
							value={classData.name}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group controlId='course-id-input'>
						<Form.Label>Course</Form.Label>
						<select
							className='form-select'
							name="course"
							value={classData.course}
							onChange={handleCourseChange}
						>
							<option value="">Select a course</option>
							{courses.map((course) => (
								<option key={course.id} value={course.id}>
									{course.name}
								</option>
							))}
						</select>
					</Form.Group>
					<Form.Group controlId='year-level-input'>
						<Form.Label>Year Level</Form.Label>
						<Form.Control
							type='number'
							name='year_level'
							value={classData.year_level}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group controlId='section-input'>
						<Form.Label>Section</Form.Label>
						<Form.Control
							type='text'
							name='section'
							value={classData.section}
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
