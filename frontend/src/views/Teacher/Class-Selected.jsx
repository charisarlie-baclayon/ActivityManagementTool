import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	useFetchClass,
	useUpdateClass,
	useDeleteClass,
} from "../../hooks/useClass";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { UpdateClassPopup } from "../../components/popups/comment/teacher-update-comment";

export const Teacher_SelectedClassSection = () => {
	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const navigate = useNavigate();

	const { id } = useParams();
	const deleteClass = useDeleteClass();
	const [classData, setClassData] = useState(null);
	const fetchClassData = useFetchClass(id);

	useEffect(() => {
		if (fetchClassData) {
			setClassData(fetchClassData);
		}
	}, [fetchClassData]);

	const handleEdit = (e) => {
		e.preventDefault();
		setShowModal(true);
	};

	const handleDelete = async (e) => {
		e.preventDefault();

		// todo: add a modal to confirm deletion

		try {
			const response = await deleteClass(id);

			if (response) {
				console.log("Successfully deleted team!");
				navigate("/teacher/classes");
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
						<span className="nav-item nav-link" onClick={() => { navigate(-1) }}>
							<FiChevronLeft />
						</span>
						<h4 className="fw-bold m-0">{classData ? `Class - ${classData.name}` : "Loading..."}</h4>
					</div>
					<div className="d-flex flex-row gap-3 ">
						<button
							className='btn btn-outline-secondary btn-block fw-bold bw-3 m-0 '
							onClick={handleEdit}
						>
							Edit Class
						</button>
						<button
							className='btn btn-danger btn-block fw-bold bw-3 m-0 '
							onClick={handleDelete}
						>
							Delete Class
						</button>
					</div>
				</div>
				<hr className='text-dark' />
				<div>
					{classData ? (
						<div>
							<p>Course Name: {classData.course.name}</p>
							<p>Year Level: {classData.year_level}</p>
							<p>Section: {classData.section}</p>
							<p>Date Created: {classData.date_created}</p>
						</div>
					) : (
						<p>Loading class details...</p>
					)}
				</div>
			</div>
			{classData ? (
				<UpdateClassPopup
					show={showModal}
					handleClose={handleCloseModal}
					data={classData}
				/>
			) : (
				<p>Loading data...</p>
			)}
		</div>
	);
};
