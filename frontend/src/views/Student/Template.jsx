import { useState, useEffect } from "react";
import { ClassCard } from "../../components/Cards/Card.Class";
import { CreateClassPopup } from "../../components/popups/class/teacher-create-class";
import { useFetchClasses } from "../../hooks/useClass";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { CreateTemplatePopup } from "../../components/popups/template/teacher-create-template";
import { useFetchTemplates } from "../../hooks/useTemplate";
import { TemplateCard } from "../../components/Cards/Card.Template";

export const Student_TemplateSection = () => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const classes = useFetchClasses();
    const templates = useFetchTemplates();
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const navigateToClass = (id) => {
        navigate(`${id}`);
    };

    useEffect(() => {
        if (classes && classes.length > 0) {
            setIsLoading(false);
        }
    }, [classes]);

    return (
        <div className='container-md'>
            <div className='container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3'>
                <div className='d-flex flex-row justify-content-between'>
                    <div className="d-flex flex-row align-items-center gap-3">
                        <span className="nav-item nav-link" onClick={() => { history.back() }}>
                            <FiChevronLeft />
                        </span>
                        <h4 className='fw-bold m-0'>Templates</h4>
                    </div>
                    <div className="d-flex flex-row gap-3 ">
                        <button
                            className='btn btn-primary btn-block fw-bold bw-3 m-0'
                            onClick={handleShowModal}
                        >
                            Add Template
                        </button>
                    </div>
                </div>
                <hr className='text-dark' />
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className='d-flex flex-column gap-3'>
                        {Array.isArray(templates) &&
                            templates.map((templateItem) => (
                                <div key={templateItem.id}>
                                    <TemplateCard
                                        templateData={templateItem}
                                        onClick={() => navigateToClass(templateItem.id)}
                                    />
                                </div>
                            ))}
                    </div>
                )}

                <CreateTemplatePopup show={showModal} handleClose={handleCloseModal} />
            </div>
        </div>
    );
};
