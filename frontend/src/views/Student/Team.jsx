import React, { useState, useEffect } from 'react';
import { ClassCard } from "../../components/Cards/Card.Class";
import { useFetchTeams } from "../../hooks/useTeam";
import { useFetchStudentsByTeam } from "../../hooks/useStudent";
import { useNavigate } from "react-router-dom";

export const Student_TeamSection = () => {
	const [showModal, setShowModal] = useState(false);
	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);
	const students = useFetchStudentsByTeam(1);

	const [isLoading, setIsLoading] = useState(true);

	const navigate = useNavigate();

	const navigateToTeam = (id) => {
		navigate(`${id}`);
	};

	useEffect(() => {
		if (students && students.length > 0) {
			setIsLoading(false);
		}
	}, [students]);

    return (
        <div className="container-md">
            <div className="container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3">
                <div className="d-flex flex-row justify-content-between">
                    <h4 className="fw-bold">Students</h4>
                    <div>
                        <button
                        className="btn btn-secondary btn-block fw-bold bw-3"
                        >
                        Add Student
                        </button>
                    </div>
                </div>
                <hr className="text-dark" />
                {isLoading ? (
					<div>Loading...</div>
				) : (
					<div className='row'>
						{Array.isArray(students) &&
                        students.map((studentItem) => (
                            <div key={studentItem.id} className='col-md-3 mb-3'>
                            <StudentCard
                                studentData={studentItem}
                                onClick={() => navigateToStudent(studentItem.id)}
                            />
                            </div>
                        ))}
					</div>
				)}
            </div>
        </div>
    );
};