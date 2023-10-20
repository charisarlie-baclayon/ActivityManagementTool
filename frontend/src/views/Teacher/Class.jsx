import React, { useState, useEffect } from 'react';
import { readClasses } from '../../api/Classes';
import { ClassCard } from '../../components/Cards/Card.Class';
import { CreateClassPopup } from '../../components/popups/class/teacher-create-class';

export const Teacher_ClassSection = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [classes, setClasses] = useState([]);
  
  const navigateToClass = (id) => {
    window.location.href = `classes/${id}`;
  };

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await readClasses();
                setClasses(response);
            } catch (error) {
                console.log(error.response);
            }
        };

        fetchClasses();
    }, []);

    return (
        <div className="container-md">
            <div className="container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3">
                <div className="d-flex flex-row justify-content-between">
                    <h4 className="fw-bold">Classes</h4>
                    <div>
                        <button
                        className="btn btn-secondary btn-block fw-bold bw-3"
                        onClick={handleShowModal}
                        >
                        Add Class
                        </button>
                    </div>
                </div>
                <hr className="text-dark" />
                <div className='row'>
                    {Array.isArray(classes) &&
                        classes.map((classItem) => (
                            <div key={classItem.id} className="col-md-3 mb-3">
                                {/* Render your class card here */}
                                <ClassCard classData={classItem} onClick={() => navigateToClass(classItem.id)}/>
                            </div>
                        ))}
                </div>
                <CreateClassPopup show={showModal} handleClose={handleCloseModal} />
            </div>
        </div>
    );
};