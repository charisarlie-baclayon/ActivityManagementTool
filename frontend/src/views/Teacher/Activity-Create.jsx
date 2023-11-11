import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { useFetchCourses } from "../../hooks/useCourse";
import { useCreateActivity } from "../../hooks/useActivity";
import { useFetchTeams } from "../../hooks/useTeam";

export const Teacher_CreateActivitySection = () => {
    const navigate = useNavigate();
    const createActivity = useCreateActivity();

    // Activity Model
    const [activityData, setActivityData] = useState({
        title: "",
        description: "",
        course_id: "",
        team_id: "",
        year_level: "",
        section: "",
        submission_status: false,
        due_date: null,
        evaluation: null,
        total_score: 100,
    });

    const teams = useFetchTeams();
    const courses = useFetchCourses();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActivityData({
            ...activityData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createActivity(activityData);
            if (response) {
                navigate('/teacher/activities/');
                console.log("Successfully created activity!");
            } else {
                console.log("Activity creation failed.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container-md">
            <div className="container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3">
                <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-row align-items-center gap-2">
                        <span
                            className="nav-item nav-link"
                            onClick={() => navigate(-1)}
                        >
                            <FiChevronLeft />
                        </span>
                        <h4 className="fw-bold m-0">
                            Create Activity
                        </h4>
                    </div>
                    <div className="d-flex flex-row gap-3 ">
                        <button
                            className="btn btn-outline-secondary btn-block fw-bold bw-3 m-0 "
                            onClick={() => { navigate('/teacher/activities/templates') }}
                        >
                            Use Templates
                        </button>
                    </div>
                </div>

                <hr className="text-dark" />

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={activityData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={activityData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="course_id" className="form-label">Course</label>
                        <select
                            className="form-select"
                            id="course_id"
                            name="course_id"
                            value={activityData.course_id}
                            onChange={handleChange}
                        >
                            <option value="">Select a course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
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

                    {/*
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
                    */}

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

                    {/*
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
                    */}

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