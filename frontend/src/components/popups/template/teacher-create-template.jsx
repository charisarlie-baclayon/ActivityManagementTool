import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useCreateTemplate } from "../../../hooks/useTemplate";
import { useFetchCourses } from "../../../hooks/useCourse";
import { useNavigate } from "react-router-dom";

export const CreateTemplatePopup = ({ show, handleClose }) => {
    const createNewTemplate = useCreateTemplate();
    const courses = useFetchCourses() || []; // Fetch the list of courses
    const [templateData, setTemplateData] = useState({
        title: "",
        description: "",
        course: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTemplateData({
            ...templateData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createNewTemplate(templateData);
            await handleClose();
            navigate(0);
            //window.location.reload(); // You might want to replace this with a better way to update the templates list
        } catch (error) {
            console.error("Error creating template:", error);
            // Handle error, e.g., show an error message to the user
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title className="fs-6 fw-bold">Create Template</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex flex-column gap-3">
                    <Form.Group controlId="title-input">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={templateData.title}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="description-input">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={templateData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId='course-id-input'>
                        <Form.Label>Course</Form.Label>
                        <select
                            className='form-select'
                            name="course"
                            value={templateData.course}
                            onChange={handleChange}
                        >
                            <option value="">Select a course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
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