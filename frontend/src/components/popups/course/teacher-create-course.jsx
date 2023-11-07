import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useCreateCourse } from "../../../hooks/useCourse"; // Import the hook for creating courses

export const CreateCoursePopup = ({ show, handleClose }) => {
    const createNewCourse = useCreateCourse();

    const [courseData, setCourseData] = useState({
        name: "", // Course name
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({
            ...courseData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createNewCourse(courseData);

            await handleClose();
            window.location.reload(); // You can consider a better way to handle this
        } catch (error) {
            console.error(error);
            // Handle error, e.g., show an error message to the user
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title className="fs-6 fw-bold">Create Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex flex-column gap-3">
                    <Form.Group controlId="name-input">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={courseData.name}
                            onChange={handleChange}
                        />
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
