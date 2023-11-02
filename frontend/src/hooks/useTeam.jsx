import { useEffect, useState } from "react";
import { readTeam, readTeams } from "../api/Teams";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

export function useFetchTeam(id) {
  const [teamData, setTeamData] = useState(null);
  const accessToken = useSelector(selectCurrentToken);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await readTeam(id, accessToken);
        setTeamData(response);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    if (id) {
      fetchTeam();
    }
  }, [id, accessToken]);

  return teamData;
}


export function useFetchTeams() {
  const [teams, setTeams] = useState([]);
  const accessToken = useSelector(selectCurrentToken);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await readTeams(accessToken);
        setTeams(response);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchTeams();
  }, []);

  return teams;
}

export function useCreateTeam() {
  const accessToken = useSelector(selectCurrentToken);

  const createNewTeam = async (data) => {
    try {
      const response = await createTeam(data, accessToken);
      return response;
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  return createNewTeam;
}

export function useUpdateTeam() {
  const accessToken = useSelector(selectCurrentToken);

  const updateExistingTeam = async (id, data) => {
    try {
      const response = await updateTeam(id, data, accessToken);
      return response;
    } catch (error) {
      console.error("Error updating team:", error);
    }
  };

  return updateExistingTeam;
}

export function useDeleteTeam() {
  const accessToken = useSelector(selectCurrentToken);

  const deleteTeamById = async (id) => {
    try {
      const response = await deleteTeam(id, accessToken);
      return response;
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  return deleteTeamById;
}