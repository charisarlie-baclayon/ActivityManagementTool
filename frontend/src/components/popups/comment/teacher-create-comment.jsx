import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useCreateComment } from "../../../hooks/useComments";
import { selectCurrentId } from "../../../features/auth/authSlice";
import { useSelector } from "react-redux";

export const CreateCommentPopup = ({ show, handleClose, data }) => {
    const navigate = useNavigate();

    // State variable and handler for updating comments
    const [commentData, setCommentData] = useState({
        comment: "",
        activity_id: 0,
        user_id: 0,
    });

    const addComment = useCreateComment();
    const user_id = useSelector(selectCurrentId);

    // Handle input changes in the comment form
    const handleChange = (e) => {
        const { name, value } = e.target;
        commentData.activity_id = data.id;
        commentData.user_id = user_id;
        setCommentData({
            ...commentData,
            [name]: value,
        });
        console.log(commentData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addComment(commentData);
            // must add a conditional statement to check if response is successful
            // like if status 200 then goods

            // if response is successfully updated, then:
            if (response) {
                handleClose();

                console.log("Successfully added comment!");
                navigate(0);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title className='fs-6 fw-bold'>Add Comment</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className='d-flex flex-column gap-3'>
                    <Form.Group controlId='comment-input'>
                        <Form.Label>Comment</Form.Label>

                        <Form.Control
                            name='comment'
                            as='textarea'
                            rows={3}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='outline-secondary' onClick={handleClose}>
                    Close
                </Button>

                <Button variant='success' onClick={handleSubmit}>
                    Add Comment
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
