import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {deleteActivity, updateActivity } from "../../Api/Activity";

export const ViewSelectedActivity = ({ show, handleClose, act }) => {
  const { id, name, description, link } = act;
  const [disable, setDisable] = useState(true);
  const [editable, setEditable] = useState(true);

  const handleEdit = () => {
    setDisable(false);
    setEditable(false);
  };

  const handleModalHide = () => {
    setDisable(true);
    setEditable(true);
    handleClose();
  };

  const handleDelete = async () => {
    try {
      console.log(id);
      await deleteActivity(id);
      handleClose();
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleUpdate = async () => {
    const titleInput = document.getElementById("title-input");
    const descriptionInput = document.getElementById("description-input");
    const linkInput = document.getElementById("link-input");

    try {
      const updatedActivity = {
        name: titleInput.value,
        description: descriptionInput.value,
        link: linkInput.value,
      };
      // Call the API or perform the update operation
      await updateActivity(id, updatedActivity);
      handleClose();
      console.log(updatedActivity);
      // handle the update logic here
      setDisable(true);
      setEditable(true);
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <Modal centered show={show} onHide={handleModalHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>View Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="title-input">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                defaultValue={name}
                disabled={disable}
                readOnly={editable}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description-input">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                type="text"
                defaultValue={description}
                disabled={disable}
                readOnly={editable}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="link-input">
              <Form.Label>Link</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                type="text"
                defaultValue={link}
                disabled={disable}
                readOnly={editable}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleDelete}>
            Delete
          </Button>
          {editable ? (
            <Button variant="primary" onClick={handleEdit}>
              Edit
            </Button>
          ) : (
            <Button variant="primary" onClick={handleUpdate}>
              Submit
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};
