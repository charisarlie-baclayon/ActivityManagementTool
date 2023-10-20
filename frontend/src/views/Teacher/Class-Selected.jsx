import React, { useState, useEffect } from 'react';
import { readClass } from '../../api/Classes';
import { useParams } from 'react-router-dom';

export const Teacher_SelectedClassSection = () => {
  const [classData, setClassData] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await readClass(id);
        setClassData(response);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };

    fetchClass();
  }, [id]);

  return (
    <div className="container-md">
            <div className="container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3">
                <div className="d-flex flex-row justify-content-between">
                    <h4 className="fw-bold">Classes</h4>
                    <div>
                        <button
                        className="btn btn-secondary btn-block fw-bold bw-3"
                        >
                        Add Class
                        </button>
                    </div>
                </div>
                <hr className="text-dark" />
                <div>
                  {classData ? (
                    <div>
                      <h4 className="fw-bold">Class Details</h4>
                      <p>Name: {classData.name}</p>
                      <p>Course Name: {classData.course_name}</p>
                      <p>Year Level: {classData.year_level}</p>
                      <p>Section: {classData.section}</p>
                      <p>Date Created: {classData.date_created}</p>
                    </div>
                  ) : (
                    <p>Loading class details...</p>
                  )}
                </div>
            </div>
        </div>
  );
};