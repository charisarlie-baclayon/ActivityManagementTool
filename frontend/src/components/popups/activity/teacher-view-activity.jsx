import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {deleteActivity, updateActivity } from "../../../api/Activity";

export const ActivityPopup = ({ show, handleClose, activity }) => {
  const { id, name, description, link } = activity;
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
<<<<<<< HEAD
      if (window.confirm("Deleted Successfully.")) {
        window.location.reload();
      }
=======
      window.confirm("Deleted Successfully");
>>>>>>> 190f2debb8dc343bc169b841ae312bd701f0dcdf
    } catch (error) {
      console.error(error);
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

      window.confirm("Updated Successfully");
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
      <Modal centered show={show} onHide={handleModalHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className=" fs-6 fw-bold">View Activity</Modal.Title>
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
          <button className="btn btn-outline-secondary bw-3 btn-block fw-bold" onClick={handleDelete}>
            Delete
          </button>
          {editable ? (
            <button className="btn btn-secondary bw-3 btn-block fw-bold" onClick={handleEdit}>
              Edit
            </button>
          ) : (
            <button className="btn btn-secondary bw-3 btn-block fw-bold" onClick={handleUpdate}>
              Submit
            </button>
          )}
        </Modal.Footer>
      </Modal>
  );
};
