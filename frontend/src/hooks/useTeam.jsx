import { useEffect, useState } from "react";
import {
	useReadTeamMutation,
	useReadTeamsMutation,
	useCreateTeamMutation,
	useDeleteTeamMutation,
	useUpdateTeamMutation,
} from "../Api/Teams";

export function useFetchTeam(id) {
	const [readTeam] = useReadTeamMutation();
	const [team, setTeam] = useState(null);

	useEffect(() => {
		const fetchTeam = async () => {
			try {
				const response = await readTeam(id);
				console.log(`Use Get Team By Id : ${JSON.stringify(response, null, 2)}`);
				setTeam(response.data);
			} catch (error) {
				console.error("Error fetching team data:", error);
			}
		};

		fetchTeam();
	}, [id, readTeam]);

	return team;
}

export function useFetchTeams() {
	const [readTeams] = useReadTeamsMutation();
	const [teams, setTeams] = useState([]);

	useEffect(() => {
		const fetchTeams = async () => {
			try {
				const response = await readTeams();
				console.log(`Use Get All Teams : ${JSON.stringify(response, null, 2)}`);
				setTeams(response.data);
			} catch (error) {
				console.error("Error fetching teams data:", error);
			}
		};

		fetchTeams();
	}, [readTeams]);

	return teams;
}

export function useCreateTeam() {
	const [createTeam] = useCreateTeamMutation();

	const createNewTeam = async (data) => {
		try {
			const response = await createTeam({ ...data });
			console.log(`Use Create Team : ${JSON.stringify(response, null, 2)}`);
			return response;
		} catch (error) {
			console.error("Error creating team:", error);
		}
	};

	return createNewTeam;
}

export function useUpdateTeam() {
	const [updateTeam] = useUpdateTeamMutation();

	const updateExistingTeam = async (id, data) => {
		try {
			const response = await updateTeam({ id, ...data });
			console.log(`Use Update Team : ${JSON.stringify(response, null, 2)}`);
			return response;
		} catch (error) {
			console.error("Error updating team:", error);
		}
	};

	return updateExistingTeam;
}

export function useDeleteTeam() {
	const [deleteTeam] = useDeleteTeamMutation();

	const deleteTeamById = async (id) => {
		try {
			const response = await deleteTeam(id);
			console.log(`Use Delete Team : ${JSON.stringify(response, null, 2)}`);
			return response;
		} catch (error) {
			console.error("Error deleting team:", error);
		}
	};

	return deleteTeamById;
}
