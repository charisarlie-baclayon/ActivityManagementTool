import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createActivity } from "../../Api/Activity";

const CreateActivity = ({ show, handleClose }) => {
  const handleSubmit = async () => {
    const titleInput = document.getElementById("title-input");
    const descriptionInput = document.getElementById("description-input");
    const linkInput = document.getElementById("link-input");

    const newActivity = {
      name: titleInput.value,
      description: descriptionInput.value,
      link: linkInput.value,
    };
    console.log(newActivity);
    try {
      await createActivity(newActivity);
      handleClose(); // Close the modal after successful creation
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="title-input">
              <Form.Label>Title</Form.Label>
              <Form.Control as="textarea" rows={1} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description-input">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={8} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="link-input">
              <Form.Label>Link</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateActivity;
