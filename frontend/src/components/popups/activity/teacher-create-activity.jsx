import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
//import { createActivity } from "../../../api/Activity";

export const CreateActivityPopup = ({ show, handleClose }) => {
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
      //await createActivity(newActivity);
      handleClose();
      
      if (window.confirm("Created Successfully.")) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closebutton>
          <Modal.Title className=" fs-6 fw-bold">Create Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="title-input">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                as="textarea" rows={1} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description-input">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" rows={8} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="link-input">
              <Form.Label>Link</Form.Label>
              <Form.Control 
                as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-outline-secondary bw-3 btn-block fw-bold text-fs-5" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-secondary btn-block bw-3 fw-bold text-fs-5" onClick={handleSubmit}>
            Submit
          </button>
        </Modal.Footer>
      </Modal>
  );
};
