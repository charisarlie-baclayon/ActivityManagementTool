import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useReadWorkMutation,useDeleteWorkMutation, useUpdateWorkMutation } from "../../../Api/Work";

export const EditWorkModal = ({ show, handleClose, editWorkData, onSubmit, id, workId }) => {
    /*const [editData, setEditData] = useState({
        ...editWorkData,
        downloadLink: editWorkData?.file_attachment || '', // Assuming file_attachment is the URL
      });*/

    /*
    const [editData, setEditData] = useState(editWorkData);
    console.log(editWorkData);
*/
    const [workData, setWorkData] = useState({
      work: "",
      file_attachment: null,
      activity_id: id,
    });

    console.log(editWorkData);
    const [editData, setEditData] = useState(editWorkData || {});
    const [isDataChanged, setIsDataChanged] = useState(false);

    useEffect(() => {
      console.log('Inside useEffect. Received editWorkData:', editWorkData);
      setEditData(editWorkData || {});
    }, [editWorkData]);

    const fileAttachmentName =
    editData?.file_attachment && editData?.file_attachment.split("/").pop();
    
    console.log('Current workData:', workData);

    /*
    const handleChange = (e) => {
      const { name, value } = e.target;
      setWorkData({
        ...workData,
        [name]: value,
      });
    };*/

    console.log("Current editData:", editData);

    //Delete Work
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

    //Get work
    const [getWork] = useReadWorkMutation();

    useEffect(() => {
      const handleGet = async (e) => {
        try {
          const response = await getWork(editData.id);
          console.log(editData.id);
      
          console.log(response);
          if (response) {
            // Update workData with the response data
            setWorkData({
              work: response.data.work || "",
              file_attachment: response.data.file_attachment || null,
              activity_id: response.data.activity_id || id,
            });
            setEditData({
              ...response.data,
            });
            
            console.log("Successfully read work!");
          } else {
            console.log("Work read failed.");
          }
        } catch (error) {
          console.error("Error reading work:", error);
        }
      };

      handleGet();
    }, []);

    const {work, file_attachment, date_added } = workData;

    // If file_attachment is available, extract the file name
    /*const fileName = file_attachment ? file_attachment.split('/').pop() : 'No file attached';

    // If file_attachment is available, create a download link; otherwise, disable the link
    const downloadLink = file_attachment ? (
      <a href={file_attachment} download={fileName}>
        {fileName}
      </a>
    ) : (
      <span>{fileName}</span>
    );*/

    // Update Work
    const [updateWork] = useUpdateWorkMutation();

    const [fileAttachmentError, setFileAttachmentError] = useState(false);
    const [workError, setWorkError] = useState(false);
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

    const handleUpdate = async (e) => {

      setSubmitButtonClicked(true);
      if (!workData.file_attachment) {
        setFileAttachmentError(true);
        return;
      }
      if (workData.work.trim() === '') {
        setWorkError(true);
        return;
      }
  
      //setFileAttachmentError(false);

      const formData = new FormData();
      formData.append("activity_id", id);
      formData.append("work", workData.work);
      const fileInput = document.querySelector('input[name="file_attachment"]');
      const file = fileInput?.files[0];

      // Ensure that file_attachment is a File object
      if (file instanceof File) {
        formData.append("file_attachment", file, file.name);
      }

      // Perform validation or additional logic if needed
      console.log("Updating Work:", formData);
      for (const entry of formData.entries()) {
        console.log(entry);
      }

      const response = await updateWork({
          id: workId,  // Pass the id for completing the URL
          formData: formData,      // Pass the formData for the request body
      });

      console.log(response);
      if (response) {
        setIsDataChanged(false); // Reset the flag
        handleClose();
        console.log("Successfully updated work!");
      } else {
        console.log("Work update failed.");
      }

      window.location.reload();
    };

    const handleRemoveFile = () => {
      setWorkData({
        ...workData,
        file_attachment: null,
      });

      setIsDataChanged(true);
    };

    const handleChange = (e) => {
      const { name, value, files } = e.target;
  
      setWorkData((prevData) => ({
        ...prevData,
        [name]: name === "file_attachment" ? (files && files[0]) : value,
      }));

      setIsDataChanged(true);
    };

  
    return (
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-6 fw-bold">Edit Work</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column gap-3" encType="multipart/form-data">
            <Form.Group controlId="work-input">
              <Form.Label>Work</Form.Label>
              <Form.Control
                type="text"
                name="work"
                value={workData?.work}
                onChange={handleChange}
              />
            </Form.Group>
            {workError && workData.work.trim() === '' && (
              <p className="text-danger">Please add text to the Work field.</p>
            )}

            <Form.Group controlId="file-input">
              <Form.Label>File Attachment</Form.Label>
              {workData.file_attachment ? (
                <>
                  <p className="mb-0 mr-2">{fileAttachmentName}</p>
                  <Button variant="outline-danger" onClick={handleRemoveFile}>
                    X 
                  </Button>
                </>
              ) : (
                <Form.Control
                  type="file"
                  name="file_attachment"
                  onChange={handleChange}
                />
              )}
                
            </Form.Group>

            {fileAttachmentError && (
              <p className="text-danger">Please add a file attachment before updating.</p>
            )}

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
            disabled={!isDataChanged} // Disable the button if no changes
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