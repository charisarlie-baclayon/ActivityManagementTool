import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useAssignStudentToTeam } from "../../../hooks/useStudent";

const AssignStudentTeamPopup = ({ show, handleClose, teamId }) => {
  const [studentData, setStudentData] = useState({
    id: "",
    team_id: teamId,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const assignStudentToTeamById = useAssignStudentToTeam(); // Call the hook at the top level

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
	e.preventDefault();
  
	if (!studentData.id.trim()) {
	  setErrorMessage("Input must not be empty!");
	  return;
	}
  
	try {
	  const response = await assignStudentToTeamById(studentData.id, { team_id: studentData.team_id });
	  await handleClose();
	  window.alert('hi');
	  window.location.reload();
	} catch (error) {
	  console.error(error);
	}
  };

  const handleModalClose = () => {
    setErrorMessage(""); // Clear the error message when closing the modal
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-6 fw-bold">Assign Student to Team</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="d-flex flex-column gap-3">
          <Form.Group controlId="student-id-input">
            <Form.Label>Student ID</Form.Label>
            <Form.Control
              type="text"
              name="id"
              value={studentData.id}
              onChange={handleChange}
            />
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-outline-secondary btn-block fw-bold" onClick={handleModalClose}>
          Close
        </button>
        <button className="btn btn-secondary btn-block fw-bold" onClick={handleSubmit}>
          Submit
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignStudentTeamPopup;
