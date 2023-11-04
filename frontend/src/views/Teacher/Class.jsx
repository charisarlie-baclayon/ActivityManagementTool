import { useState, useEffect } from "react";
import { ClassCard } from "../../components/Cards/Card.Class";
import { CreateClassPopup } from "../../components/popups/class/teacher-create-class";
import { useFetchClasses } from "../../hooks/useClass";
import { useNavigate } from "react-router-dom";

export const Teacher_ClassSection = () => {
	const [showModal, setShowModal] = useState(false);
	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);
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
		<div className='container-md'>
			<div className='container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3'>
				<div className='d-flex flex-row justify-content-between'>
					<h4 className='fw-bold'>Classes</h4>
					<div>
						<button
							className='btn btn-secondary btn-block fw-bold bw-3'
							onClick={handleShowModal}
						>
							Add Class
						</button>
					</div>
				</div>
				<hr className='text-dark' />
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<div className='row'>
						{Array.isArray(classes) &&
							classes.map((classItem) => (
								<div key={classItem.id} className='col-md-3 mb-3'>
									<ClassCard
										classData={classItem}
										onClick={() => navigateToClass(classItem.id)}
									/>
								</div>
							))}
					</div>
				)}

				<CreateClassPopup show={showModal} handleClose={handleCloseModal} />
			</div>
		</div>
	);
};
