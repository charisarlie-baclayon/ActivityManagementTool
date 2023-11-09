import { apiSlice } from "./apiSlice";

export const Activity = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createActivity: builder.mutation({
			query: (data) => ({
				url: "/api/activities/",
				method: "POST",
				body: { ...data },
			}),
		}),

		createActivityFromTemplate: builder.mutation({
			query: (data) => ({
				url: "/api/activities/create_from_template/",
				method: "POST",
				body: { ...data },
			}),
		}),
		addEvaluationToActivity: builder.mutation({
			query: (data) => ({
				url: `/api/activities/${data.id}/add_evaluation/`,
				method: "POST",
				body: { ...data },
			}),
		}),
		deleteEvaluationFromActivity: builder.mutation({
			query: (id) => ({
				url: `/api/activities/${id}/delete_evaluation/`,
				method: "DELETE",
			}),
		}),
		submitActivity: builder.mutation({
			query: (id) => ({
				url: `/api/activities/${id}/submit/`,
				method: "POST",
			}),
		}),
		getActivitiesByClass: builder.mutation({
			query: (id) => ({
				url: `/api/activities/get_activities_by_class/?class_id=${id}`,
				method: "GET",
			}),
		}),
		getSubmittedActivitiesByClass: builder.mutation({
			query: (id) => ({
				url: `/api/activities/get_submitted_activities_by_class/?class_id=${id}/`,
				method: "GET",
			}),
		}),
		getSubmittedActivitiesByTeam: builder.mutation({
			query: (id) => ({
				url: `/api/activities/get_submitted_activities_by_team/?team_id=${id}/`,
				method: "GET",
			}),
		}),
		getActivitiesByTeam: builder.mutation({
			query: (id) => ({
				url: `/api/activities/?team_id=${id}`,
				method: "GET",
			}),
		}),
		getActivity: builder.mutation({
			query: (id) => `/api/activities/?id=${id}/`,
		}),
		updateActivity: builder.mutation({
			query: (data) => ({
				url: `/api/activities/${data.id}/`,
				method: "PUT",
				body: { ...data },
			}),
		}),
		getAllActivities: builder.mutation({
			query: () => ({
				url: "/api/activities/",
				method: "GET",
			}),
		}),
		getActivitiesByCourse: builder.mutation({
			query: (id) => ({
				url: `/api/activities/get_activities_by_course/?course_id=${id}`,
				method: "GET",
			}),
		}),
	}),
});
export const {
	useCreateActivityMutation,
	useCreateActivityFromTemplateMutation,
	useAddEvaluationToActivityMutation,
	useDeleteEvaluationFromActivityMutation,
	useSubmitActivityMutation,
	useGetActivitiesByClassMutation,
	useGetSubmittedActivitiesByClassMutation,
	useGetSubmittedActivitiesByTeamMutation,
	useGetActivitiesByTeamMutation,
	useGetActivityMutation,
	useGetAllActivitiesMutation,
	useGetActivitiesByCourseMutation,
	useUpdateActivityMutation,
} = Activity;
