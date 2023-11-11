import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useFetchTeams } from "../../../hooks/useTeam";
import { useFetchCourses } from "../../../hooks/useCourse";
import { useUpdateActivity } from "../../../hooks/useActivity";

export const UpdateActivityPopup = ({ show, handleClose, data }) => {
    const navigate = useNavigate();
    const teams = useFetchTeams();
    const courses = useFetchCourses();

    const updateActivity = useUpdateActivity();

    const [updateActivityData, setUpdateActivityData] = useState({
        title: data?.title,
        description: data?.description,
        course_id: data?.course_id,
        team_id: data?.team_id,
        year_level: data?.year_level,
        section: data?.section,
        submission_status: data?.submission_status,
        due_date: data?.due_date,
        evaluation: data?.evaluation,
        total_score: data?.total_score,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateActivityData({
            ...updateActivityData,
            [name]: value,
        });
        console.log(updateActivityData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateActivity(id, updateActivityData);

            // TODO : Check if Fields are empty

            if (response) {
                setUpdateActivityData(updateActivityData);
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
                <Modal.Title className='fs-6 fw-bold'>Update Activity</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className='d-flex flex-column gap-3'>
                    <Form.Group controlId='title-input'>
                        <Form.Label>Title</Form.Label>

                        <Form.Control
                            type='text'
                            name='title'
                            value={updateActivityData?.title}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId='description-input'>
                        <Form.Label>Description</Form.Label>

                        <Form.Control
                            as='textarea'
                            rows={3}
                            name='description'
                            value={updateActivityData?.description}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/*
                    <Form.Group controlId='course-input'>
                        <Form.Label>Course</Form.Label>

                        <Form.Select
                            name='course_id'
                            value={updateActivityData?.course_id}
                            onChange={handleChange}
                        >
                            <option value=''>Select a course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    */}

                    {/*
                    <Form.Group controlId='team-input'>
                        <Form.Label>Team</Form.Label>

                        <Form.Select
                            name='team_id'
                            value={updateActivityData?.team_id}
                            onChange={handleChange}
                        >
                            <option value=''>Select a team</option>
                            {teams.map((team) => (
                                <option key={team.id} value={team.id}>
                                    {team.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    */}

                    {/*
                    <Form.Group controlId='year-level-input'>
                        <Form.Label>Year Level</Form.Label>

                        <Form.Control
                            type='number'
                            name='year_level'
                            value={updateActivityData?.year_level ? parseInt(data.year_level, 10) : ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    */}

                    {/*
                    <Form.Group controlId='section-input'>
                        <Form.Label>Section</Form.Label>

                        <Form.Control
                            type='text'
                            name='section'
                            value={updateActivityData?.section}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    */}

                    {/*
                    <Form.Group controlId='submission-status-input'>
                        <Form.Label>Submission Status</Form.Label>

                        <Form.Select
                            name='submission_status'
                            value={updateActivityData?.submission_status}
                            onChange={handleChange}
                        >
                            <option value='false'>Not Submitted</option>
                            <option value='true'>Submitted</option>
                        </Form.Select>
                    </Form.Group>
                    */}

                    <Form.Group controlId='due-date-input'>
                        <Form.Label>Due Date</Form.Label>

                        <Form.Control
                            type='date'
                            name='due_date'
                            value={updateActivityData?.due_date}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/*
                    <Form.Group controlId='evaluation-input'>
                        <Form.Label>Evaluation</Form.Label>

                        <Form.Control
                            type='number'
                            name='evaluation'
                            value={updateActivityData?.evaluation}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    */}

                    <Form.Group controlId='total-score-input'>
                        <Form.Label>Total Score</Form.Label>

                        <Form.Control
                            type='number'
                            name='total_score'
                            value={updateActivityData?.total_score}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='outline-secondary' onClick={handleClose}>
                    Close
                </Button>

                <Button variant='secondary' onClick={handleSubmit}>
                    Update Activity
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
