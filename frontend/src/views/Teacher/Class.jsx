import { useState, useEffect } from "react";
import { ClassCard } from "../../components/Cards/Card.Class";
import { CreateClassPopup } from "../../components/popups/class/teacher-create-class";
import { CreateCoursePopup } from "../../components/popups/course/teacher-create-course";
import { useFetchClasses } from "../../hooks/useClass";
import { useNavigate } from "react-router-dom";

export const Teacher_ClassSection = () => {
	const [showClassModal, setShowClassModal] = useState(false);
	const [showCourseModal, setShowCourseModal] = useState(false);

	const handleShowClassModal = () => setShowClassModal(true);
	const handleShowCourseModal = () => setShowCourseModal(true);
	const handleCloseModal = () => {
		setShowClassModal(false);
		setShowCourseModal(false);
	};

	const classes = useFetchClasses();

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
		<div className="container-md">
			<div className="container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3">
				<div className="d-flex flex-row justify-content-between">
					<div className="d-flex flex-row">
						<h4 className="fw-bold m-0">Classes</h4>
					</div>
					<div className="d-flex flex-row gap-3 ">
						<button
							className="btn btn-primary btn-block fw-bold bw-3 m-0"
							onClick={handleShowClassModal}
						>
							Add Class
						</button>
						<button
							className="btn btn-outline-secondary btn-block fw-bold bw-3 m-0"
							onClick={handleShowCourseModal}
						>
							Add Course
						</button>
					</div>
				</div>
				<hr className="text-dark" />
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<div className="row">
						{Array.isArray(classes) &&
							classes.map((classItem) => (
								<div key={classItem.id} className="col-md-3 mb-3">
									<ClassCard
										classData={classItem}
										onClick={() => navigateToClass(classItem.id)}
									/>
								</div>
							))}
					</div>
				)}

				<CreateClassPopup show={showClassModal} handleClose={handleCloseModal} />
				<CreateCoursePopup show={showCourseModal} handleClose={handleCloseModal} />
			</div>
		</div>
	);
};
