import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDeleteWorkMutation, useUpdateWorkMutation } from "../../../Api/Work";

export const EditWorkModal = ({ show, handleClose, editWorkData, onSubmit }) => {
    /*const [editData, setEditData] = useState({
        ...editWorkData,
        downloadLink: editWorkData?.file_attachment || '', // Assuming file_attachment is the URL
      });*/

    /*
    const [editData, setEditData] = useState(editWorkData);
    console.log(editWorkData);
*/

    console.log(editWorkData);
    const [editData, setEditData] = useState(editWorkData || {});

    useEffect(() => {
      console.log('Inside useEffect. Received editWorkData:', editWorkData);
      setEditData(editWorkData || {});
    }, [editWorkData]);

    const fileAttachmentName =
    editData?.file_attachment && editData?.file_attachment.split("/").pop();
    
    console.log('Current editData:', editData);

    const downloadLink = editWorkData?.file_attachment;

    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditData({
        ...editData,
        [name]: value,
      });
    };

    console.log("Current editData:", editData);

    const [deleteWork] = useDeleteWorkMutation();

    const handleDelete = async (e) => {
      const response = await deleteWork(editData.id);
      console.log(editData.id);

      console.log(response);
      if (response) {
        handleClose();
        console.log("Successfully deleted work!");
      } else {
        console.log("Work delete failed.");
      }

      window.location.reload();
	  };

    // Update Work
    const [updateWork] = useUpdateWorkMutation();

    const handleUpdate = async (e) => {
      const formData = new FormData();
      formData.append("activity_id", editData.activity_id);
      formData.append("work", editData.work);
      formData.append("file_attachment", editData.file_attachment);

      // Perform validation or additional logic if needed
      console.log("Updating Work:", formData);
      for (const entry of formData.entries()) {
        console.log(entry);
      }

      const response = await updateWork({
          id: editWorkData.id,  // Pass the id for completing the URL
          formData: formData,      // Pass the formData for the request body
      });

      console.log(response);
      if (response) {
        handleClose();
        console.log("Successfully updated work!");
      } else {
        console.log("Work update failed.");
      }

      //window.location.reload();
    };

  
    return (
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-6 fw-bold">Edit Work</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column gap-3">
            <Form.Group controlId="work-input">
              <Form.Label>Work</Form.Label>
              <Form.Control
                type="text"
                name="work"
                value={editData?.work}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="file-input">
              <Form.Label>File Attachment</Form.Label>
              {fileAttachmentName && (
                <span>
                  <br />
                  {fileAttachmentName}
                </span>
              )}
            </Form.Group>

            {/* Add more Form.Group elements for other fields as needed */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button 
            variant="secondary" 
            onClick={handleUpdate}
          >
            Update Work
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDelete}
          >
            Delete Work
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };