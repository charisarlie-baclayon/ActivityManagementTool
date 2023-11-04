import { useState, useEffect } from "react";
import { ClassCard } from "../../components/Cards/Card.Class";
import { CreateTeamPopup } from "../../components/popups/team/teacher-create-team";
import { useFetchTeams } from "../../hooks/useTeam";
import { useNavigate } from "react-router-dom";

export const Teacher_TeamSection = () => {
	const [showModal, setShowModal] = useState(false);
	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);
	const teams = useFetchTeams();

	const [isLoading, setIsLoading] = useState(true);

	const navigate = useNavigate();

	const navigateToTeam = (id) => {
		navigate(`${id}`);
	};

	useEffect(() => {
		if (teams && teams.length > 0) {
			setIsLoading(false);
		}
	}, [teams]);

	return (
		<div className='container-md'>
			<div className='container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3'>
				<div className='d-flex flex-row justify-content-between'>
					<h4 className='fw-bold'>Teams</h4>
					<div>
						<button
							className='btn btn-secondary btn-block fw-bold bw-3'
							onClick={handleShowModal}
						>
							Add Team
						</button>
					</div>
				</div>
				<hr className='text-dark' />
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<div className='row'>
						{Array.isArray(teams) &&
							teams.map((teamItem) => (
								<div key={teamItem.id} className='col-md-3 mb-3'>
									<ClassCard
										classData={teamItem}
										onClick={() => navigateToTeam(teamItem.id)}
									/>
								</div>
							))}
					</div>
				)}
				<CreateTeamPopup show={showModal} handleClose={handleCloseModal} />
			</div>
		</div>
	);
};
