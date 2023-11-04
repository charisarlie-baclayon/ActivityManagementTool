import { apiSlice } from "./apiSlice";

export const Teams = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		readTeams: builder.mutation({
			query: () => ({
				url: "/api/teams/",
				method: "GET",
			}),
		}),
		readTeam: builder.mutation({
			query: (id) => ({
				url: `/api/teams/${id}/`,
				method: "GET",
			}),
		}),
		createTeam: builder.mutation({
			query: (data) => ({
				url: "/api/teams/",
				method: "POST",
				body: { ...data },
			}),
		}),
		deleteTeam: builder.mutation({
			query: (id) => ({
				url: `/api/teams/${id}/`,
				method: "DELETE",
			}),
		}),
		updateTeam: builder.mutation({
			query: (id, data) => ({
				url: `/api/teams/${id}/`,
				method: "PUT",
				body: { ...data },
			}),
		}),
	}),
});

export const {
	useReadTeamsMutation,
	useReadTeamMutation,
	useCreateTeamMutation,
	useDeleteTeamMutation,
	useUpdateTeamMutation,
} = Teams;
