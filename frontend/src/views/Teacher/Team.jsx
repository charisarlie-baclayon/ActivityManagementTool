import React, { useState, useEffect } from 'react';
import { readClasses } from '../../api/Classes';

export const Teacher_TeamSection = () => {
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
                    <h4 className="fw-bold">Teams</h4>
                    <div>
                        <button
                        className="btn btn-secondary btn-block fw-bold bw-3"
                        onClick={handleShowModal}
                        >
                        Add Team
                        </button>
                    </div>
                </div>
                <hr className="text-dark" />
            </div>
        </div>
    );
};