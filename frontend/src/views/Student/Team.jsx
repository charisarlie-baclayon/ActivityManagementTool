import React, { useState, useEffect } from 'react';
import { StudentCard } from "../../components/Cards/Card.Student";
import { useFetchStudentsByTeam } from "../../hooks/useStudent";
import { useNavigate } from "react-router-dom";

export const Student_TeamSection = () => {
    const studentsData = useFetchStudentsByTeam(1); // Assuming this function returns an object, not an array
    const students = Array.isArray(studentsData) ? studentsData : []; // Convert to an array
    console.log(students);

	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const navigateToStudent = (id) => {
		navigate(`${id}`);
	};

    return (
        <div className="container-md">
            <div className="container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3">
                <div className="d-flex flex-row justify-content-between">
                    <h4 className="fw-bold">Members</h4>
                    <div>
                    </div>
                </div>
                <hr className="text-dark" />
                
					<div className='row'>
						{Array.isArray(students) &&
                        students.map((studentItem) => {
                            console.log("Mapping student:", studentItem);
                            return (
                                <div key={studentItem.id} className='col-md-3 mb-3'>
                                    <StudentCard
                                        studentData={studentItem}
                                        //onClick={() => navigateToStudent(studentItem.id)}
                                    />
                    </div>
                );
                })}
					</div>
            </div>
        </div>
    );
};