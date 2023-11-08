import { FiChevronLeft } from "react-icons/fi";
import { useDeleteTemplate, useFetchTemplate } from "../../hooks/useTemplate";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchTeams } from "../../hooks/useTeam";
import { useCreateActivityfromTemplate } from "../../hooks/useActivity";

export const Teacher_SelectedTemplateSection = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [templateData, setTemplateData] = useState(null);
    const teams = useFetchTeams();
    const fetchTemplateData = useFetchTemplate(id);
    const deleteTemplate = useDeleteTemplate();

    // Use the new function for creating an activity from a template
    const createActivityFromTemplate = useCreateActivityfromTemplate();

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
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { team_id } = activityData; // Assuming you want to use the selected team for the new activity

        // Create the payload for the new activity
        const newActivityData = {
            template_id: id,
            team_id,
        };

        try {
            const response = await createActivityFromTemplate(newActivityData);
            if (response) {
                console.log("Successfully created activity from template!");
                navigate('/teacher/activities')
            } else {
                console.log("Activity creation from template failed.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Define the initial state for the editable fields
    const [activityData, setActivityData] = useState({
        title: "",
        description: "",
        course_id: "",
        team_id: "", // You can select a team from the dropdown
        year_level: "",
        section: "",
        submission_status: false,
        due_date: null,
        evaluation: null,
        total_score: 100,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActivityData({
            ...activityData,
            [name]: value,
        });
    };

    // Set the initial values for the pre-filled fields if templateData is available
    useEffect(() => {
        if (templateData) {
            setActivityData({
                ...activityData,
                title: templateData.title,
                description: templateData.description,
                course_id: templateData.course.id,
            });
        }
    }, [templateData]);

    return (
        <div className='container-md'>
            <div className='container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3'>
                <div className='d-flex flex-row justify-content-between'>
                    <div className="d-flex flex-row align-items-center gap-2">
                        <span className="nav-item nav-link" onClick={() => { navigate(-1) }}>
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
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={activityData.title}
                            disabled // Make it uneditable
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={activityData.description}
                            disabled // Make it uneditable
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="course_id" className="form-label">Course</label>
                        <input
                            type="text"
                            className="form-control"
                            id="course_id"
                            name="course_id"
                            value={activityData.course_id}
                            disabled // Make it uneditable
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="team_id" className="form-label">Team</label>
                        <select
                            className="form-select"
                            id="team_id"
                            name="team_id"
                            value={activityData.team_id}
                            onChange={handleChange}
                        >
                            <option value="">Select a team</option>
                            {teams.map((team) => (
                                <option key={team.id} value={team.id}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="year_level" className="form-label">Year Level</label>
                        <input
                            type="number"
                            className="form-control"
                            id="year_level"
                            name="year_level"
                            value={activityData.year_level}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="section" className="form-label">Section</label>
                        <input
                            type="text"
                            className="form-control"
                            id="section"
                            name="section"
                            value={activityData.section}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="submission_status" className="form-label">Submission Status</label>
                        <select
                            className="form-select"
                            id="submission_status"
                            name="submission_status"
                            value={activityData.submission_status}
                            onChange={handleChange}
                        >
                            <option value="false">Not Submitted</option>
                            <option value="true">Submitted</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="due_date" className="form-label">Due Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="due_date"
                            name="due_date"
                            value={activityData.due_date}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="evaluation" className="form-label">Evaluation</label>
                        <input
                            type="number"
                            className="form-control"
                            id="evaluation"
                            name="evaluation"
                            value={activityData.evaluation}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="total_score" className="form-label">Total Score</label>
                        <input
                            type="number"
                            className="form-control"
                            id="total_score"
                            name="total_score"
                            value={activityData.total_score}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Create Activity</button>
                </form>
            </div>
        </div>
    );
};
