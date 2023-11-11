import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useAddEvaluationToActivity } from "../../../hooks/useActivity";

export const CreateEvaluationPopup = ({ show, handleClose, data }) => {
    const navigate = useNavigate();
    const [evaluationData, setEvaluationData] = useState({
        id: data?.id,
        evaluation: data?.evaluation,
    });

    const addEvaluation = useAddEvaluationToActivity();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvaluationData({
            ...evaluationData,
            [name]: value,
        });
        console.log(evaluationData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // todo: add logic to handle adding evaluation

        try {
            const response = addEvaluation(updateActivityData);
            console.log("Evaluation added successfully!");
            handleClose();
            navigate(0);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title className='fs-6 fw-bold'>Add Evaluation</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className='d-flex flex-column gap-3'>
                    <Form.Group controlId='evaluation-input'>
                        <Form.Label>Evaluation</Form.Label>

                        <Form.Control
                            type='number'
                            name='evaluation'
                            value={evaluationData?.evaluation}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant='outline-secondary'
                    onClick={handleClose}
                >
                    Close
                </Button>

                <Button variant='success' onClick={handleSubmit}>
                    Add Evaluation
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
