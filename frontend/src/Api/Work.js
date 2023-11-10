import { apiSlice } from "./apiSlice";

export const Work = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		readWorks: builder.mutation({
			query: () => "/api/works/",
		}),

		readWork: builder.mutation({
			query: (id) => `/api/works/${id}/`,
		}),

		getWorkByActivity: builder.mutation({
			query: (id) => ({
				url: `/api/works/get_work_by_activity/?activity_id=${id}`,
				method: "GET",
			}),
		}),

		createWork: builder.mutation({
			query: (formData) => ({
				url: "/api/works/",
				method: "POST",
				body: formData,
			}),
		}),

		deleteWork: builder.mutation({
			query: (id) => ({
				url: `/api/works/${id}/`,
				method: "DELETE",
			}),
		}),

		updateWork: builder.mutation({
			query: (data) => ({
				url: `/api/works/${data.id}/`,
				method: "PUT",
				body: { ...data },
			}),
		}),
	}),
});

export const {
	useReadWorksMutation,
	useReadWorkMutation,
	useGetWorkByActivityMutation,
	useCreateWorkMutation,
	useDeleteWorkMutation,
	useUpdateWorkMutation,
} = Work;
