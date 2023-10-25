import { useParams } from 'react-router-dom';
import { useFetchClass } from '../../hooks/Class/useClass';

export const Teacher_SelectedClassSection = () => {
  const { id } = useParams(); 
  const classData = useFetchClass(id);

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