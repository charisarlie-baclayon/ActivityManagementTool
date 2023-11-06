import { useParams } from 'react-router-dom';
import { useFetchClass } from '../../hooks/useClass';
import { FiChevronLeft } from 'react-icons/fi';

export const Teacher_SelectedActivitySection = () => {
	const { id } = useParams();
	const classData = useFetchClass(id);

	return (
		<div className="container-md">
			<div className="container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3">
				<div className="d-flex flex-row justify-content-between">
					<div className="d-flex flex-row align-items-center gap-2">
						<span className="nav-item nav-link" onClick={() => { history.back() }}>
							<FiChevronLeft />
						</span>
						<h4 className='fw-bold m-0'>Activities</h4>
					</div>
					<div className="d-flex flex-row gap-3 ">
						<button
							className='btn btn-outline-secondary btn-block fw-bold bw-3 m-0 '
							onClick={handleEdit}
						>
							Edit Activity
						</button>
						<button
							className='btn btn-danger btn-block fw-bold bw-3 m-0 '
							onClick={handleDelete}
						>
							Delete Activity
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