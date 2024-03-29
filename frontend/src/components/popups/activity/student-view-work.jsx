import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useCreateWork, useFetchWorksByActivity } from '../../../hooks/useWork';
import { useNavigate } from "react-router-dom";
import { useCreateWorkMutation } from "../../../Api/Work";

export const WorkPopup = ({ show, handleClose, id }) => {
	const navigate = useNavigate();
	const [workData, setWorkData] = useState({
		work: "",
		file_attachment: null,
		activity_id: id,
	});

	const [disable, setDisable] = useState(false);
	const [prompt, setPrompt] = useState({ show: false, message: "" });

  	//const createWork = useCreateWork();

	const handleChange = (e) => {
		const { name, value, files } = e.target;

		setWorkData((prevData) => ({
			...prevData,
			[name]: name === "file_attachment" ? files[0] : value,
		}));
	};

	const handleModalHide = () => {
		setPrompt({ show: false, message: "" });
		setDisable(false);
		handleClose();
	};

	const [createWork] = useCreateWorkMutation();

	const handleUpdate = async (e) => {

		if (!workData.work || !workData.file_attachment) {
			setPrompt({
			  show: true,
			  message: "Please provide both 'Work' and 'File Attachment' before submitting.",
			});
			return;
		  }

		const formData = new FormData();
		formData.append("activity_id", id);
		formData.append("work", workData.work);
		formData.append("file_attachment", workData.file_attachment);

    // Perform validation or additional logic if needed
		console.log("Submitting Work:", formData);
		for (const entry of formData.entries()) {
			console.log(entry);
		}

	const response = await createWork(formData);
		console.log(response);
		if (response) {
			handleClose();
			console.log("Successfully created work!");
		} else {
			console.log("Work creation failed.");
		}
		// You can add logic here to update the state or make an API call to create a new work

    	// Reset the form and close the modal
		setWorkData({ work: "", file_attachment: null });
		setDisable(false);

		window.location.reload();
	};

  return (
    <Modal centered show={show} onHide={handleModalHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fs-6 fw-bold">Add Work</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="work-input">
            <Form.Label>Work</Form.Label>
            <Form.Control
              type="text"
              name="work"
              value={workData.work}
              onChange={handleChange}
              disabled={disable}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="file-input">
            <Form.Label>File Attachment</Form.Label>
            <Form.Control
              type="file"
              name="file_attachment"
              onChange={handleChange}
              disabled={disable}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
	  	{prompt.show && <p className="text-danger">{prompt.message}</p>}
        <button
          className="btn btn-secondary bw-3 btn-block fw-bold"
          onClick={handleUpdate}
        >
          Submit
        </button>
      </Modal.Footer>
    </Modal>
  );
};