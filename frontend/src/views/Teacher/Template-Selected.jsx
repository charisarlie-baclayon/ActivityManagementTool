import { FiChevronLeft } from "react-icons/fi";
import { useDeleteTemplate, useFetchTemplate } from "../../hooks/useTemplate";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const Teacher_SelectedTemplateSection = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [templateData, setTemplateData] = useState(null);
    const fetchTemplateData = useFetchTemplate(id);
    const deleteTemplate = useDeleteTemplate();

    useEffect(() => {
        if (fetchTemplateData) {
            setTemplateData(fetchTemplateData);
        }
    }, [fetchTemplateData]);

    const handleDelete = async (e) => {
        e.preventDefault();

        // todo: add a modal to confirm deletion

        try {
            const response = await deleteTemplate(id);

            if (response) {
                console.log("Successfully deleted template!");
                navigate("/teacher/activities/templates");
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className='container-md'>
            <div className='container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3'>
                <div className='d-flex flex-row justify-content-between'>
                    <div className="d-flex flex-row align-items-center gap-2">
                        <span className="nav-item nav-link" onClick={() => { history.back() }}>
                            <FiChevronLeft />
                        </span>
                        <h4 className="fw-bold m-0">{templateData ? `Template - ${templateData.title}` : "Loading..."}</h4>
                    </div>
                    <div className="d-flex flex-row gap-3 ">
                        <button
                            className='btn btn-outline-secondary btn-block fw-bold bw-3 m-0 '
                        >
                            Edit Template
                        </button>
                        <button
                            className='btn btn-danger btn-block fw-bold bw-3 m-0 '
                            onClick={handleDelete}
                        >
                            Delete Template
                        </button>
                    </div>
                </div>
                <hr className='text-dark' />
                <div>
                    {templateData ? (
                        <div>
                        </div>
                    ) : (
                        <p>Loading class details...</p>
                    )}
                </div>
            </div>
        </div>
    );
};
