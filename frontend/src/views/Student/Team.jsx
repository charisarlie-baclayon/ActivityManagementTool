import React, { useState, useEffect } from 'react';
import { StudentCard } from "../../components/Cards/Card.Student";
import { useFetchStudentsByTeam } from "../../hooks/useStudent";
import { useNavigate } from "react-router-dom";
import { useFetchTeams } from "../../hooks/useTeam";
import { TeamCard } from "../../components/Cards/Card.Team";
import { CreateTeamPopup } from "../../components/popups/team/teacher-create-team";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	selectCurrentUser,
	selectCurrentToken,
	logOut,
} from "../../features/auth/authSlice";
import { setStudentModel,selectCurrentTeam, selectStudentModel } from "../../features/slice/studentModelSlice"; // Import the student model slice
import { loadFromLocalStorage } from "../../components/utils/utils";

export const Student_TeamSection = () => {
	const dispatch = useDispatch();
	// Load the student model data when the component mounts
	useEffect(() => {
		const savedStudentModel = loadFromLocalStorage('studentModel');
		if (savedStudentModel) {
		  // Dispatch an action to set the loaded data into Redux state
		  dispatch(setStudentModel(savedStudentModel));
		}
	  }, []);

	const user = useSelector(selectCurrentUser);
	console.log(user);
	const team_id = useSelector(selectCurrentTeam); // Get the student model from Redux
	console.log(team_id);

	const [filteredTeams, setFilteredTeams] = useState([]); // Create a state for filtered teams

	const [showModal, setShowModal] = useState(false);
	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);
	const teamItem = useFetchTeams();
	console.log(teamItem);
	

	const [isLoading, setIsLoading] = useState(false);
	const [studentsByTeam, setStudentsByTeam] = useState([]);

	const navigate = useNavigate();

	const navigateToTeam = (id) => {
		navigate(`${id}`);
	};

	useEffect(() => {
		if (team_id) {
			// If team_id is available, you can proceed with filtering the teams
			if (teamItem.length > 0) {
				const filteredTeams = teamItem.filter((team) => team.id === team_id);
				setFilteredTeams(filteredTeams);
			}
		}
	}, [teamItem, team_id]);

	console.log(filteredTeams);

	return (
		<div className='container-md'>
			<div className='container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3'>
				<div className='d-flex flex-row justify-content-between'>
					<div className="d-flex flex-row">
						<h4 className='fw-bold m-0'>Teams</h4>
					</div>
					<div className="d-flex flex-row">
						{filteredTeams.length === 0 && ( // Check if there are no teams
							<button
							className='btn btn-primary fw-bold bw-3 m-0 '
							onClick={handleShowModal}
							>
							Create Team
							</button>
						)}
					</div>
				</div>
				<hr className='text-dark' />
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<div className='row'>
						{filteredTeams.map((team) => (
						<div key={team.id} className='col-md-3 mb-3'>
							<TeamCard
							teamData={team}
							onClick={() => navigateToTeam(team.id)}
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