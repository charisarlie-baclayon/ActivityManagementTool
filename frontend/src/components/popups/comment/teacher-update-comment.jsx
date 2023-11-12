import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useUpdateClass } from "../../../hooks/useClass";

export const UpdateClassPopup = ({ show, handleClose, data }) => {
    const navigate = useNavigate();
    const updateClass = useUpdateClass();

    const [updateClassData, setUpdateClassData] = useState({
        id: data?.id,
        name: data?.name,
        course_name: data?.course_name,
        year_level: data?.year_level,
        section: data?.section,
    });

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
            const response = await updateClass(data.id, updateClassData);

            // must add a conditional statement to check if response is successful
            // like if status 200 then goods

            // if response is successfully updated, then:
            if (response) {
                setUpdateClassData(updateClassData);
                handleClose();
                console.log("Successfully updated class!");
                navigate(0);
            }
        } catch (error) {
            console.error(error);
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
                            value={updateClassData?.name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* 
                        <Form.Group controlId='course-name-input'>
                            <Form.Label>Course Name</Form.Label>

                            <Form.Control
                                type='text'
                                name='course_name'
                                value={updateClassData?.course_name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    */}

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
        </Modal >
    );
};
