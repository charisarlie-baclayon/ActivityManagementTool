import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

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

    const handleDelete = (e) => {
	};
  
    return (
      <Modal show={show} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title className='fs-6 fw-bold'>Edit Work</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='d-flex flex-column gap-3'>
            <Form.Group controlId='work-title-input'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                value={editData?.work}
                onChange={handleChange}
              />
            </Form.Group>
  
            <Form.Group controlId='work-file-attachment-input'>
            <Form.Label>File Attachment</Form.Label>
            <span><br/>{editWorkData?.file_attachment && editWorkData?.file_attachment.split('/').pop()}</span>
          </Form.Group>
  
            {/* Add more Form.Group elements for other fields as needed */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='secondary' onClick={() => onSubmit(editData)}>
            Update Work
          </Button>
          <Button variant='secondary' onClick={handleDelete()}>
            Delete Work
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };