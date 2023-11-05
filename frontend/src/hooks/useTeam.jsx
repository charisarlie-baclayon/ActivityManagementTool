import { useEffect, useState } from "react";
import {
	useReadTeamsMutation,
	useReadTeamMutation,
	useCreateTeamMutation,
	useDeleteTeamMutation,
	useUpdateTeamMutation,
} from "../api/Teams";

export function useFetchTeam(id) {
	const [readTeam] = useReadTeamMutation();
	const [team, setTeam] = useState(null);

	useEffect(() => {
		const fetchTeam = async () => {
			try {
				const response = await readTeam(id);
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
	const [teams, setTeams] = useState(null);

	useEffect(() => {
		const fetchTeams = async () => {
			try {
				const response = await readTeams();
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
			console.log("useEffect", id);
			const response = await updateTeam({ id, ...data });
			return response;
		} catch (error) {
			console.error("Error fetching team data:", error);
		}
	};

	return updateExistingTeam;
}

export function useDeleteTeam() {
	const [deleteTeam] = useDeleteTeamMutation();

	const deleteTeamById = async (id) => {
		try {
			const response = await deleteTeam(id);
			return response;
		} catch (error) {
			console.error("Error deleting team:", error);
		}
	};

	return deleteTeamById;
}
