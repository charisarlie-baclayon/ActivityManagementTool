import { useEffect, useState } from "react";
import { readTeam, readTeams } from "../../api/Teams";

export function useFetchTeam(id) {
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await readTeam(id);
        setTeamData(response);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeam();
  }, [id]);

  return teamData;
}

export function useFetchTeams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await readTeams();
        setTeams(response);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchTeams();
  }, []);

  return teams;
}
